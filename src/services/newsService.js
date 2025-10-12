import api from './api'

class NewsService {
  async getAllNews(queryString = '') {
    try {
      const url = queryString ? `/news?${queryString}` : '/news'
      const response = await api.get(url)
      console.log('getAllNews response:', response.data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async getPublishedNews(queryString = '') {
    try {
      const url = queryString ? `/news/published?${queryString}` : '/news/published'
      const response = await api.get(url)
      console.log('getPublishedNews response:', response.data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async getNewsBySlug(slug) {
    try {


      const response = await api.get(`/news/slug/${slug}`)



      return response.data
    } catch (error) {

      throw error
    }
  }

  async getNewsById(id) {
    try {


      const response = await api.get(`/news/${id}`)



      return response.data
    } catch (error) {

      throw error
    }
  }

  async createNews(newsData) {
    try {


      const response = await api.post('/news', newsData)



      return response.data
    } catch (error) {

      throw error
    }
  }

  async updateNews(id, newsData) {
    try {


      const response = await api.put(`/news/${id}`, newsData)



      return response.data
    } catch (error) {

      throw error
    }
  }

  async deleteNews(id) {
    try {
ß
      const response = await api.delete(`/news/${id}`)

      return response.data
    } catch (error) {

      throw error
    }
  }
}

export const newsService = new NewsService()
