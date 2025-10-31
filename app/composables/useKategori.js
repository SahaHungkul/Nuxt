import api from "~/services/api";
import { ref } from "vue";

export const useKategori = () => {
  const kategori = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchKategori = async () => {
    try {
      loading.value = true;

      const res = await api.get("/kategori");
      kategori.value = res.data.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  
  const createKategori = async (data) => {
    try {
      const res = await api.post("/kategori", data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const getKategoriId = async(id) => {
    try{
      const res = await api.get(`/kategori/${id}`);
      return res.data;
    }catch(err){
      throw err.response?.data ||err
    }
  }
  const updateKategori = async (id, payload) => {
    try {
      const res = await api.put(`/kategori/${id}`, payload);
      return res.data;
    } catch (err) {
      throw err.response?.data ||err;
    }
  };
  const deleteKategori = async (id) => {
    try{
      const res = await api.delete(`/kategori/${id}`);
      return res.data;
    }catch(err){
      throw err.response?.data
    }
  };

  return {
    kategori,
    error,
    loading,
    fetchKategori,
    getKategoriId,
    createKategori,
    updateKategori,
    deleteKategori,
  };
};
