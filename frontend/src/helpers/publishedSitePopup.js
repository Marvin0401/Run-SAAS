import PreviewToast from "@components/preview-toast/preview-toast.component";
import { setStatus } from "@redux/slices/site";

const publishedSiteToast = (settings, setPopUp, dispatch) => {
  const url = settings.domain
    ? `https://${settings.domain}`
    : `https://${settings.id}.designedtorun.com`;

  setPopUp({
    title: "Site Published",
    children: <PreviewToast url={url} />,
  });
  window.open(url, "_blank");
  dispatch(setStatus("idle"));
};

export default publishedSiteToast;
