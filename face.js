window.onload = async function () {
  try {
    if (typeof faceapi === 'undefined') {
      console.error('❌ faceapi not loaded');
      return;
    }

    console.log('✅ face-api.js loaded');

    await faceapi.nets.tinyFaceDetector.loadFromUri('/ub/models');
    console.log('✅ face-api model loaded');


    window.detectFaces11 = async function (base64Image) {
        //console.log('接收到圖片:', base64Image);

        const img = new Image();
        img.src = base64Image;
        await img.decode();

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const detections = await faceapi.detectAllFaces(
          canvas,
          new faceapi.TinyFaceDetectorOptions()
        );

        console.log('👤 Detected faces:', detections.length);

        // 模擬回傳 true / false
        if (detections.length > 0) {
          return true;
        } else {
          return false;
        }
      };


    console.log('👋 detectFaces 已註冊給 window');
  } catch (e) {
    console.error('❌ JS 初始化錯誤:', e);
  }
};
