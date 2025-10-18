import { config } from "@/config";
import axios from "axios";

export const imgUpload = async (img: File) => {
  const formData = new FormData();
  // formData.append('image', e.target.files[0])
  formData.append("image", img);

  // console.log(formData)

  try {
    // photo upload to imgbb
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${config().ImgBB_URL}`,
      formData
    );

    const photoPreview = data.data.display_url;
    return photoPreview;
  } catch (err) {
    return err;
  }
};
