const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const fileName = file.name.toLowerCase();

  const isCsv = fileName.endsWith('.csv');
  const isTxt = fileName.endsWith('.txt');

  if (!isCsv && !isTxt) {
    setIngestionWarnings([
      'Please upload a valid .txt or .csv file.'
    ]);
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const content = event.target?.result as string;

    setInputFormat(isCsv ? 'csv' : 'txt');
    setInputText(content);
    setIngestionWarnings([]);
  };

  reader.readAsText(file);
};

const runPipeline = async () => {
  setLoading(true);
  setIngestionWarnings([]);

  try {
    const ingestRes = await fetch('/api/ingest/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: inputText,
        format: inputFormat
      })
    });

    const ingestJson = await ingestRes.json();

    if (
      ingestJson.warnings &&
      ingestJson.warnings.length > 0
    ) {
      setIngestionWarnings(ingestJson.warnings);
    }

    const textToProcess =
      ingestJson.text || inputText;

    const preRes = await fetch(
      '/api/ingest/preprocess',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: textToProcess
        })
      }
    );

    const preJson = await preRes.json();

    setPreprocessingData(preJson);

  } catch (err: any) {
    setIngestionWarnings([
      err.message || 'Pipeline execution failed'
    ]);
  } finally {
    setLoading(false);
  }
};
