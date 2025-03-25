import { useEffect, useState } from 'react';
import axios from 'axios';

function getTextFromHtml(html: string): string {
  if (typeof window === 'undefined') return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export function useSystemMessage(
  key: string
): { html: { __html: string } | null; text: string | null; loading: boolean } {
  const [html, setHtml] = useState<{ __html: string } | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `https://backend-appdiversa.onrender.com/app_diversa/v1/messages/${key}/`
        );
        const content = res.data?.content || '';
        setHtml({ __html: content });
        setText(getTextFromHtml(content));
      } catch (error) {
        setHtml(null);
        setText(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [key]);

  return { html, text, loading };
}
