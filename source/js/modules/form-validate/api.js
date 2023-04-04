function sendData(onSuccess, onFail, body) {
  fetch('https://echo.htmlacademy.ru/',
      {
        method: 'POST',
        body,
      })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onFail();
        }
      })
      .catch(() => onFail());
}

export {sendData};
