class CustomResponse {
  constructor(code, message, data) {
    this.resCode = code;
    this.resMessage = message;
    this.resData = data;
  }

  toJSON() {
    const response = {
      resCode: this.resCode,
      resMessage: this.resMessage,
    };

    if (this.resData !== null) {
      response.resData = this.resData;
    }

    return response;
  }
}

export default CustomResponse;
