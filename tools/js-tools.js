const Tools = window.Tools = {
  // html 转义
  html2Escape: function (sHtml) {
    return sHtml ? sHtml.replace(/[<>&"]/g, function (c) {
      return {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;'
      }[c];
    }) : '';
  },
  /* 存储历史记录 */
  storeHistory: function (HistoryKey, list, time) {
    localStorage.removeItem(HistoryKey);
    time = time || 30;
    var _time = +new Date(),
      _age = time * 24 * 60 * 60 * 1000, // 30day
      b = {};
    b._value = list;
    b._endTime = _time + _age; //
    localStorage.setItem(HistoryKey, JSON.stringify(b));
  },

  /* 清除历史记录 */
  clearHistory: function (HistoryKey) {
    localStorage.setItem(HistoryKey, '');
  },

  /* 获取历史记录 */
  getHistory: function (HistoryKey) {
    var data = window.localStorage.getItem(HistoryKey);
    var list = data ? JSON.parse(data) : [];
    return list;
  }
};