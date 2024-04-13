import { ElNotification, ElMessageBox, ElMessage } from "element-plus";

export function toast(
  title,
  msg,
  type = "success",
  dangerouslyUseHTMLString = false,
) {
  ElNotification({
    title: title,
    message: msg,
    type: type,
    dangerouslyUseHTMLString,
    duration: 2000,
  });
}

export function showModal(msg, type = "warning", title = "") {
  return ElMessageBox.confirm(msg, title, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: type,
  });
}

export function showMessage(type = "success", msg = "操作成功") {
  ElMessage({
    type: type,
    message: msg,
  });
}
