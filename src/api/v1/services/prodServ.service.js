//Commerce
import ProdServ from '../models/ProdServ';
import boom from '@hapi/boom';

//FIC: GET PRODUCTS AND SERVICES LIST
export const getProdServList = async () => {
    let prodServList;
    try {
          prodServList = await ProdServ.find();
          return(prodServList);
    } catch (error) {
      //res.status(500).json({ message: 'Error: ' + ficError });
      throw boom.internal(error);
    }
  };

//FIC: GET PRODUCT OR SERVICE BY ID
export const getProdServItem = async (id, keyType) => {
    let prodServItem;
   
    try {
      if (keyType === 'OK') {
        prodServItem = await ProdServ.findOne({
        IdProdServOK: id,
        });
      } else if (keyType === 'BK') {
          prodServItem = await ProdServ.findOne({
          IdProdServBK: id,
        });
      }
      return(prodServItem);
    } catch (error) {
      throw boom.internal(error);
    }
  };

// POST (ADD) Productos y/o Servicios.
export const postProdServItem = async (paProdServItem) => {
  try {
    const newProdServItem = new ProdServ(paProdServItem);
    return await newProdServItem.save();
  } catch (error) {
    throw error;
  }
};

//FIC: SERVICES PUT
// PUT (MODIFY) INSTITUTOS
export const putProdServItem = async (id, paInstitutoItem) => {
  try {
      //console.log("FIC: PUT API INSTITUTO", id);
      return await ProdServ.findOneAndUpdate({ IdProdServPK: id }, paInstitutoItem, {
        new: true,
      });
  } catch (error) {
      throw boom.badImplementation(error);
  }
};

//FIC: UPDATE ARRAY[OBJECT] INFO ADICIONAL NO EXPORT USE INTERNAL
const setObjInfoAdCO = async (id, objInfoAd) => {
  try {
      const contractUpdatedCO = await ProdServ.findOneAndUpdate(
          { IdProdServPK: id,
            cat_prod_serv_estatus: { $elemMatch: { IdProdServMaOK: objInfoAd.IdEtiqueta }}
          },
          { $set: { [`cat_prod_serv_estatus.$`]: objInfoAd }},
          { new: true }
      );
      return { succes: true, contractUpdatedCO };
  } catch (error) {
      return { succes: false, error };
  }
};

//DELETEEEEEEEEEEEEEEEEEEEEEEE
export const deleteProdServItem = async (id) => {
  try {
      //console.log("FIC: PUT API INSTITUTO", id);
      return await ProdServ.findOneAndDelete({ IdProdServPK: id }, {new: true,});
  } catch (error) {
      throw boom.badImplementation(error);
  }
};

