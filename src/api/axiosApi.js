import axios from 'axios'
import i18n from '@/i18n'

export const API_URL_BACKEND = 'https://back-vitalfix.onrender.com'

export const apiHttp = async (
  method,
  endpoint,
  data,
  options = {},
  loading = true,
  jwtToken = null
) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (jwtToken) {
    defaultHeaders.Authorization = `Bearer ${jwtToken}`
  }

  options.headers = { ...defaultHeaders, ...options.headers }

  if (loading) {
    window.getApp.$emit('LOADING', true)
  }

  try {
    const responseData = await axios({
      method: method.toLowerCase(),
      url: `${API_URL_BACKEND}${endpoint}`,
      data,
      ...options,
    })

    return responseData
  } catch (error) {
    console.error(error.response)

    let errorResponse = {
      ok: 0,
      message: {
        code: 'E999',
        text: i18n.t('message.apiErrorUndefined')
      }
    }

    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorResponse.message.text = i18n.t('message.apiError401')
          break
        case 404:
          errorResponse.message.text = i18n.t('message.apiError404')
          break
        case 500:
          errorResponse.message.text = i18n.t('message.apiError500')
          break
        case 405:
        case 406:
          errorResponse.message.text = i18n.t('message.apiError405_406')
          break
        default:
          errorResponse.message.text = error.response.data.message.text
      }
    }

    return errorResponse
  } finally {
    window.getApp.$emit('LOADING', false)
  }
}
