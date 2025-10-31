import api from "~/services/api";
import { ref } from "vue";

export const useCoa = () => {
  const coa = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCoa = async () => {
    try {
      loading.value = true;

      const res = await api.get("/coa");
      coa.value = res.data.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const createCoa = async (data) => {
    try {
      const res = await api.post("/coa", data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const getCoaId = async (id) =>{
    try{
        const res = await api.get(`/coa/${id}`);
        return res.data;
    }catch(err){
        throw err.response?.data
    }
  }

  const updateCoa = async (id,payload) =>{
    try{
        const res = await api.put(`/coa/${id}`, payload);
        return res.data;
    }catch(err){
        throw err.response?.data || err;
    }
  };

  const deleteCoa = async (id) =>{
    try{
        const res = await api.delete(`/coa/${id}`);
        return res.data;
    }catch(err){
        throw err.response?.data;
    }
  };

  return {
    coa,
    loading,
    error,
    fetchCoa,
    getCoaId,
    createCoa,
    updateCoa,
    deleteCoa,
  };
};
