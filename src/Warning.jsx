export default function Warning({ warningText }) {
  if (!warningText) return null;
  return (
    <p className="warning" role="alert">
      {warningText}
    </p>
  );
}

/**
 * @param {{ warningText?: string }} props
 */
