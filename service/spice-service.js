const { ObjectId } = require("mongodb")

const getAllSpices = async (req, res) => {
    try {
      const spices = await req.db.collection('spices').find().toArray()
      
      res.status(200).json({
        message: 'Spices successfully retrieved',
        data: spices
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  const createSpices = async (req, res) => {
    const { 
      namaHerb,
      deskripsi,
      manfaat,
      dosis,
      saranOlahan

    } = req.body
    
    console.log(      
      namaHerb,
      deskripsi,
      manfaat,
      dosis,
      saranOlahan);
    
    try {
      const newSpice = await req.db.collection('spices').insertOne({       
        namaHerb,
        deskripsi,
        manfaat,
        dosis,
        saranOlahan })
      
      res.status(200).json({
        message: 'Spices successfully created',
        data: newSpice
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const updateSpices = async (req, res) => {
    try {
      // Dapatkan ID pengguna yang akan diperbarui dari parameter permintaan
      const spiceId = req.params.spicesId;
  
      // Dapatkan data pengguna yang diperbarui dari badan permintaan
      const updatedSpiceData = req.body;
  
      // Validasi bahwa updatedUserData tidak kosong dan berisi setidaknya satu bidang yang akan diperbarui
      if (!updatedSpiceData || Object.keys(updatedSpiceData).length === 0) {
        return res.status(400).json({ error: "Spice data not available " });
      }
  
      // Perbarui dokumen pengguna dalam koleksi 'user' berdasarkan ID pengguna
      const result = await req.db.collection("spices").updateOne(
        { _id: new ObjectId(spiceId) },
        { $set: updatedSpiceData } // Gunakan $set untuk memperbarui bidang-bidang tertentu
      );
  
      if (result.modifiedCount === 0) {
        // Jika tidak ada dokumen yang diubah, pengguna dengan ID yang diberikan tidak ditemukan
        return res.status(404).json({ error: "Rempah-rempah tidak ditemukan." });
      }
  
      // Kirim respons sukses
      res.status(200).json({ message: "Rempah-rempah berhasil diperbarui" });
    } catch (error) {
      // Tangani semua kesalahan yang terjadi selama proses pembaruan
      console.error("Kesalahan saat memperbarui rempah-rempah:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteSpices = async (req, res) => {
    try {
      // Ekstrak ID pengguna yang akan dihapus dari parameter permintaan (req.params)
      const spiceId = req.params.spicesId;
  
      // Hapus pengguna berdasarkan ID dari database (gunakan req.db)
      const result = await req.db.collection('spices').deleteOne({ _id: new ObjectId(spiceId) });
  
      if (result.deletedCount === 0) {
        // Jika tidak ada dokumen yang dihapus, pengguna dengan ID yang diberikan tidak ditemukan
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Kirim respons sukses jika pengguna berhasil dihapus
      res.status(204).send('data spice success deleted');
    } catch (error) {
      // Tangani kesalahan jika terjadi selama proses penghapusan pengguna
      console.error('Error deleting user:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAllSpices,
    createSpices,
    updateSpices,
    deleteSpices
  }