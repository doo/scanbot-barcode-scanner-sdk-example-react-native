class BarcodeType {
  id: string;

  name: string;

  isAccepted: boolean;

  constructor(id: string, name: string, isAccepted: boolean) {
    this.id = id;
    this.name = name;
    this.isAccepted = isAccepted;
  }
}

export default BarcodeType;
