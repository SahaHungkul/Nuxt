import api from "~/services/api";
import { ref } from "vue";

export const useLaporan = () => {
  const laporan = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchLaporan = async () => {
    try {
      loading.value = true;

      const res = await api.get("/laporan");
      laporan.value = res.data.data || res.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const exportExcel = async () => {
    try {
      const response = await api.get("/laporan/export", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "laporan.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Gagal mengekspor laporan:", err);
      throw err.response?.data || err;
    }
  };

  return {
    laporan,
    loading,
    error,
    fetchLaporan,
    exportExcel,
  };
};
