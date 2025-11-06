import { useState } from 'react';
import Warning from './Warning';

export default function Textarea({ text, setText }) {
  const [warningText, setWarningText] = useState('');

  const handleChange = (e) => {
    let newText = e.target.value;

    // Basic validation rules. Extend here as needed.
    if (newText.includes('<script>')) {
      setWarningText('No <script> tags allowed!');
      newText = newText.replace(/<script>/gi, '');
    } else if (newText.includes('@')) {
      setWarningText('No @ symbol allowed!');
      newText = newText.replace(/@/g, '');
    } else {
      setWarningText('');
    }
    setText(newText);
  };

  return (
    <div className="textarea">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text"
        spellCheck="false"
        aria-label="Input text for word analytics"
      />
      {warningText && <Warning warningText={warningText} />}
    </div>
  );
}

// Props contract (JSDoc)
/**
 * @typedef {Object} TextareaProps
 * @property {string} text - Current text value
 * @property {(next: string) => void} setText - State setter for text
 */
