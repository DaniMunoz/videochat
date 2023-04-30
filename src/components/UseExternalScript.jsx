import { useEffect } from "react";

const useExternalScript = async (resourceUrl) => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.src = resourceUrl;
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    //script.setAttribute("crossorigin", "anonymous");
    //document.body.appendChild(script);
    head.appendChild(script);
    return () => {
      //document.body.removeChild(script);
      head.removeChild(script);
    };
  }, [resourceUrl]);
};
export default useExternalScript;
