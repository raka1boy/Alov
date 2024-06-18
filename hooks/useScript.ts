import { useEffect } from 'react';

const useScript = (url: string) => {
	useEffect(() => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = url;
		document.head.appendChild(script);
	}, [url]);
};

export default useScript;
