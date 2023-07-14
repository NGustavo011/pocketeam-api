
import axios from 'axios'
import { type HttpClient } from '../http-client'

export class AxiosAdapter implements HttpClient {
  async get (url: string): Promise<any> {
    return await axios.get(url)
  }
}
