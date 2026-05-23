export function validateFile(file) {
  const MAX_FILE_SIZE = 500 * 1024 * 1024;

  const blockedExtensions = [
    ".exe",
    ".bat",
    ".cmd",
    ".sh",
    ".msi",
  ];

  if (!file) {
    return {
      valid: false,
      message: "No file selected.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      message: "File size must be less than 500 MB.",
    };
  }

  const fileName = file.name.toLowerCase();

  const isBlocked = blockedExtensions.some((ext) =>
    fileName.endsWith(ext)
  );

  if (isBlocked) {
    return {
      valid: false,
      message: "This file type is blocked for security reasons.",
    };
  }

  return {
    valid: true,
    message: "File is valid.",
  };
}