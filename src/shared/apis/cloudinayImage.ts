const CLOUD_NAME = import.meta.env.VITE_APP_ClOUDINARY_NAME;

// 프로필 이미지
export async function uploadCloudImage(file: File): Promise<string | null> {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thdud_preset");
    data.append("folder", "BOOKSOME");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: data
      }
    );
    const json = await res.json();
    if (json) {
      return json.secure_url;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error, "클라우디너리 이미지 업로드 실패");
    return null;
  }
}
