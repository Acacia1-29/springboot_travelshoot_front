import { Message, MessageBox, Loading } from "element-ui"; //消息提示框
import store from "@/store";
import router from '@/router'

/**
 *  获取计算机外设列表 储存摄像头数据
 *
 *  */
export function GetDevices() {
  return new Promise((resolve, reject) => {
    // 判断浏览器是否支持 mediaDevices.enumerateDevices() 方法
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      window.alert("不支持 mediaDevices.enumerateDevices()");
    }
    // 列出所有音频和视频输入和输出设备的设备信息
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        let cameraList = [];
        // 遍历设备
        devices.forEach((device, index) => {
          // 获取摄像头外设 videoinput
          if (device.kind && device.kind === "videoinput") {

            if (device.deviceId) {

              cameraList.push({
                id: device.deviceId,
                label: device.label
              });
            }
          }
        });
        resolve(cameraList);
      })
      .catch(err => {
        console.log(err.name + ": " + err.message);
        reject();
      });
  });
}


/**
 * 得到完整的时间格式
 */
export function FormatDateTime(val) {
  if (!val) return "";
  let date = new Date(val);
  if (!date) return "";

  var y = date.getFullYear();
  var m = (date.getMonth() + 1).toString();
  m = parseInt(m) < 10 ? "0" + m : m;
  var d = date.getDate().toString();
  d = parseInt(d) < 10 ? "0" + d : d;
  var h = date.getHours().toString();
  h = parseInt(h) < 10 ? "0" + h : h;
  var minute = date.getMinutes().toString();
  minute = parseInt(minute) < 10 ? "0" + minute : minute;
  var second = date.getSeconds().toString();
  second = parseInt(second) < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
}

export function GetTimeDifference(date) {
  const now = new Date();
  const diffInMilliseconds = now - date;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) {
    return `${diffInMonths}个月前`;
  } else if (diffInDays > 0) {
    return `${diffInDays}天前`;
  } else if (diffInHours > 0) {
    return `${diffInHours}小时前`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}分钟前`;
  } else {
    return '刚刚发表';
  }
}
export function GetFormatHMSDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  month = (month < 10) ? '0' + month : month;
  day = (day < 10) ? '0' + day : day;
  hour = (hour < 10) ? '0' + hour : hour;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  let currentDate = hour + ":" + minutes + ":" + seconds;
  return currentDate;
}

export function GetFormatShortDate(val) {
  if (!val) return "";
  let date = new Date(val);
  if (!date) return "";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  month = (month < 10) ? '0' + month : month;
  day = (day < 10) ? '0' + day : day;
  hour = (hour < 10) ? '0' + hour : hour;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  let currentDate = year + "-" + month + "-" + day;

  return currentDate;
}
/**
 * 公共删除提示框
 * @param config
 * @returns
 */
export function OpenDelMessageBox(config) {
  let _config = {
    title: config.title || "提示",
    content: config.content || "你确定要删除选中的数据吗?",
  };
  return new Promise(function (resolve, reject) {
    MessageBox.confirm(_config.content, _config.title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}
/**
 * 公共确认提示框
 * @param {*} config
 * @returns
 */
export function ConfirmMessageBox(config) {
  let _config = {
    title: config.title || "提示",
    content: config.content || "",
  };
  return new Promise(function (resolve, reject) {
    MessageBox.confirm(_config.content, _config.title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

/**
 * 获取视频的长度
 * @param {*} files
 * @param {*} isVideo
 * @returns
 */
export async function CheckSize(files, isVideo) {
  if (!files || !files[0]) return false;
  const checktimevideo = document.getElementById("checktimevideo");
  if (checktimevideo) {
    document.body.removeChild(checktimevideo);
  }
  let doms;
  if (isVideo) {
    doms = document.createElement("video");
  } else {
    doms = document.createElement("audio");
  }
  const url = URL.createObjectURL(files[0]);
  doms.src = url;
  doms.id = "checktimevideo";
  doms.style.display = "none";
  document.body.appendChild(doms);
  return await gettime(doms);
}
function gettime(doms) {
  // 由于loadedmetadata 是异步代码所以需要promise进行封装转换为同步代码执行
  const promise = new Promise((resolve) => {
    doms.addEventListener("loadedmetadata", (e) => {
      let obj = {
        videoWidth: doms.videoWidth, // 尺寸宽 --- 分辨率
        videoHeight: doms.videoHeight, // 尺寸高
        duration: e.target.duration, // 视频时长 1表示一秒
      };
      resolve(obj);
    });
  });
  return promise;
}

/**
 * 加载出图片的宽高
 */
export function LoadImage(url) {

  // 由于loadedmetadata 是异步代码所以需要promise进行封装转换为同步代码执行
  const promise = new Promise((resolve) => {
    var img = new Image();
    img.src = url;
    img.onload = function () {
      resolve({ width: img.width, height: img.height });
    }
    img.onerror = function () {
      resolve({ width: 0, height: 0 });
    }

    img.onload();
  });
  return promise;
}

/**
 * 加上本地的地址
 * @param {*} images
 * @returns
 */
export function ReplaceImageHttp(value) {

  if (value.indexOf('http') == -1 && value.indexOf('https') == -1) {
    if (value.indexOf("/") == 0) {
      return process.env.VUE_APP_BASE_API + value;
    }
    return process.env.VUE_APP_BASE_API + '/' + value;
  }
  return value;
}

/**
 * 拷贝一个对象
 * @param {*} source
 * @returns
 */
export function Clone(source) {
  return JSON.parse(JSON.stringify(source));
}
/*函数节流*/
export function Throttle(fn, interval) {
  var enterTime = 0; //触发的时间
  var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认300ms
  return function () {
    var context = this;
    var backTime = new Date(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments[0]);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
export function Debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer);
    var context = this;
    var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn.call(context, args[0]);
    }, gapTime);
  };
}




/**
 * 获取路径中的文件名称
 */
export function GetFileNameByPath(path) {
  if (!path) {
    return "";
  }
  var pos1 = path.lastIndexOf('/');
  var pos2 = path.lastIndexOf('\\');
  var pos = Math.max(pos1, pos2);
  if (pos < 0) {
    return path;
  }
  else {
    return path.substring(pos + 1);
  }
}
/**
 * 获取路径中的文件格式
 */
export function GetFileTypeByPath(path) {
  if (!path) {
    return "";
  }
  var pos = path.lastIndexOf('.');
  if (pos < 0) {
    return "";
  }
  else {
    return path.substring(pos + 1);
  }
}
/**
 * 切割字段返回一个集合
 * @param {*} value 需要切割字段
 * @param {*} cutting 切割的符号
 */
export function ConvertArray(value = '', cutting = ',') {
  if (!value) {
    return [];
  }
  return value.split(cutting);
}
/**
 * 根据路径获取文件的详细信息
 */
export function FullConvertUrlArray(value = '', cutting = ',') {
  var arr = ConvertArray(value, cutting);
  arr = arr.map(x => { return { url: ReplaceImageHttp(x), name: GetFileNameByPath(x), type: GetFileTypeByPath(x) }; });
  return arr;

}
/**
 * 获取对象中指定key的值
 */
export function GetObjectValue(obj, name) {

  if (!name) {
    return undefined;
  }
  if (!obj) { return undefined };
  if (name.indexOf(".") != -1) {
    var array = name.split(".");

    var value = obj;
    array.forEach((item) => {
      if (value != null) {
        value = value[`${item}`];
      }
    })
    return value;
  }
  else {
    return obj[`${name}`];
  }
}
/**
 * 检查是否登录状态
 * @returns
 */
export function CheckIsLogin() {
  if (!store.getters.token) {

    setTimeout(() => {
      router.push("/login")
    }, 500)

    Message(
      {
        showClose: true,
        message: '请先登录后,再操作',
        type: 'error'
      }
    )
    return false;
  }
  return true;
}
/**
 * 退出
 * @returns
 */
export function LoginOut() {
  router.push("/login")

}
/**
 * 拷贝当前路径到剪切板
 */
export function CopyToClipboard() {
  const path = window.location.href;
  const el = document.createElement('textarea');
  el.value = path;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
export default {
  CopyToClipboard,
  OpenDelMessageBox,
  ReplaceImageHttp,
  Clone,
  ConfirmMessageBox,
  Throttle,
  Debounce,
  GetTimeDifference,
  GetFormatHMSDate,
  GetFormatShortDate,
  FormatDateTime,
  GetFileNameByPath,
  GetFileTypeByPath,
  ConvertArray,
  FullConvertUrlArray,
  GetObjectValue,
  CheckIsLogin,
  LoginOut,
  LoadImage,
  GetDevices,
  CheckSize
};
