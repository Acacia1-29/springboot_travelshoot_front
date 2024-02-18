import request from "@/utils/request";
import { Loading, MessageBox, Message } from 'element-ui';
import { OpenDelMessageBox, ConfirmMessageBox } from "@/utils/index"

export async function post(url, data) {
  let response = {
    Code: "",
    Data: "",
    Msg: "",
    Success: true,
  };
  await request({
    url: url,
    method: "post",
    data: data || {},
  })
    .then((res) => {

      response.Success = res.Success;
      response.Msg = res.Msg;
      response.Code = res.Code;
      response.Data = res.Data;
    })
    .catch((ex) => {

      response.Success = false;
      response.Msg = ex;
    });
  return response;
}

/**
 * 带loading框的请求
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
export async function PostLoading(url, data) {
  const loading = Loading.service({
    lock: true,
    fullscreen: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  let response = await post(url, data);
  loading.close();

  return response;
}
/**
 * 带提示框的删除
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
export async function PostDelete(url, data) {

  let confirm = await ConfirmMessageBox({ content: "你确定要删除吗?" })
  if (confirm) {
    await post(url, data);
  }
  return {};
}

/**
 * 带提示框操作
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
export async function PostConfirm(url, data, content = "你确定要操作吗?") {

  let confirm = await ConfirmMessageBox({ content: content })
  if (confirm) {
    await post(url, data);
  }
  return {};
}
/**
 * 更新某个表的字段请求
 */
export async function PostSigleUpdate(getUrl, saveUrl, id, content, obj) {

  let confirm = await ConfirmMessageBox({ content })
  if (confirm) {
    let { Data } = await this.$Post(getUrl, { Id: id });
    Data = { ...Data, ...obj };
    await post(saveUrl, Data);
  }

  return {};
}
/**
 * 更新某个表的字段信息
 * @returns 
 */
export async function PostSigleUpdateNoMessageBox(url, id, obj) {


  let { Data } = await this.$Post(url, {});
  Data = { ...Data, ...obj };
  await post(url, Data);


  return {};
}

