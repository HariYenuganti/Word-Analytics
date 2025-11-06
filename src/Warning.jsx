export default function Warning({ warningText }) {
  if (!warningText) return null;
  return (
    <p className="mt-2 px-4 text-sm text-destructive" role="alert">
      {warningText}
    </p>
  );
}

/**
 * @param {{ warningText?: string }} props
 */
