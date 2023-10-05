// Utility class to work with byte arrays
export class ByteArrayUtils {
  static toHex(rawBytes: number[]): string {
    return Array.from(rawBytes, function (byte) {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('');
  }

  static fromHex(hex: string): number[] {
    const bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
      bytes.push(parseInt(hex.substring(c, c + 2), 16));
    }
    return bytes;
  }

  static toString(rawBytes: number[]): string {
    return String.fromCharCode(...rawBytes);
  }

  static fromString(str: string): number[] {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      bytes.push(code);
    }
    return bytes;
  }
}
