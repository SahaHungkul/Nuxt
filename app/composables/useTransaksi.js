import api from "~/services/api";
import { ref } from "vue";

export const useTransaksi = () => {
  const transaksi = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchTransaksi = async () => {
    try {
      loading.value = true;

      const res = await api.get("/transaksi");
      transaksi.value = res.data.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const createTransaksi = async (data) => {
    try {
      const res = await api.post("/transaksi", data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };
  const getTransaksiId = async (id) => {
    try{
        const res = await api.get(`/transaksi/${id}`);
        return res.data;
    }catch (err){
        throw err.response?.data || err;
    }
  }

  const deleteTransaksi = async (id) => {
      try{
        const res = await api.delete(`/transaksi/${id}`);
        return res.data;
      }catch(err){
        throw err.response?.data
      }
    };

  return {
    transaksi,
    loading,
    error,
    fetchTransaksi,
    getTransaksiId,
    createTransaksi,
    deleteTransaksi,
  };
};
