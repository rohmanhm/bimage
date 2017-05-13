import mem = require('mem')

namespace Bimage {
  export interface Classes {
    load (): any
    base64 (): string | never
    width (): number
    height (): number
  }
  export type Attr = {
    [key: string]: string
  }
}

class Bimage implements Bimage.Classes {
  public image: any

  constructor (
    public path: string,
    public attr?: Bimage.Attr
  ) {
    // Automatically load the image from path given
    this.load()
  }

  /**
   * Load image from given path
   *
   * @returns
   *
   * @memberof Bimage
   */
  async load () {
    const loader = (path: string) => new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'Anonymous' // To hijack the CORS if possible
      image.onload = () => resolve(image)

      // Set attribute to image
      if (this.attr) {
        Object.keys(this.attr).forEach(attrName => {
          const attrValue: string = this.attr[attrName]
          if (attrValue) {
            image.setAttribute(attrName, String(attrValue))
          }
        })
      }

      image.src = path
    })

    // Memoizing image from given path
    const memoize = mem(loader)
    this.image = await memoize(this.path)

    return this.image
  }

  /**
   * Get base64 data from image
   *
   * @returns
   *
   * @memberof Bimage
   */
  base64 () {
    try {
      const canvas: HTMLCanvasElement = document.createElement('canvas')
      canvas.height = this.height
      canvas.width = this.width

      const context = canvas.getContext('2d')

      if (context) {
        context.drawImage(this.image, 0, 0)
      }

      return canvas.toDataURL('image/jpeg')
    } catch (e) {
      throw new Error(`Bimage: ${ e }`)
    }
  }

  /**
   * Get image width
   *
   * @readonly
   *
   * @memberof Bimage
   */
  get width () {
    return this.image.width
  }

  /**
   * Get image height
   *
   * @readonly
   *
   * @memberof Bimage
   */
  get height () {
    return this.image.height
  }

  /**
   * Get image element node
   *
   * @readonly
   *
   * @memberof Bimage
   */
  get node () {
    return this.image
  }
}

if (typeof window) {
  (window as any).Bimage = Bimage
} else if (typeof global) {
  (global as any).Bimage = Bimage
}

export = Bimage
