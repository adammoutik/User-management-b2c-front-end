import axios from "axios";
import { getCookie } from "./auth.service";
import { generateRandomPassword } from "./users.service";








export const getCustomers = async() => {
    try {
        // const msToken = getCookie("token");
        const token = getCookie("access_token")
        const customers = await fetch("http://localhost:3000/customer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
                });
        if(!customers)
            return null;
        console.log(customers)
        return customers.json().then((res) => res);
        
    } catch (error) {
        console.log(error.message)
    }
    return 

}



export const addCustomer = async (customerData) => {
    try {
        const token = getCookie("access_token");
        const response = await axios.post('http://localhost:3000/customer/new', customerData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        
        
            const resData = await response.data;
            alert('Customer added successfully!');
            return resData;
        
    } catch (error) {
        let errorMessage = 'Error adding customer: ';
        

            errorMessage += error.message;
        

        throw new Error(errorMessage);
    }
};

export const updateCustomer = async (customerData, objectId) => {
    try {
        const token = getCookie("access_token");
        
        const {
            objectId,
            extension_1333e86bbc33478dbb6a47bc91d8cd23_pART_NUM,
            displayName,
            signInNames,
            extension_1333e86bbc33478dbb6a47bc91d8cd23_cONTRAT,
            extension_1333e86bbc33478dbb6a47bc91d8cd23_iDNUMBER,
            extension_1333e86bbc33478dbb6a47bc91d8cd23_tYPE,
            userType,
          } = customerData
        const response = await axios.patch(`http://localhost:3000/customer/${objectId}`, {
            objectId,
            extension_1333e86bbc33478dbb6a47bc91d8cd23_pART_NUM,
            displayName,
            signInNames,
            extension_1333e86bbc33478dbb6a47bc91d8cd23_cONTRAT,
            extension_1333e86bbc33478dbb6a47bc91d8cd23_iDNUMBER,
            extension_1333e86bbc33478dbb6a47bc91d8cd23_tYPE,
            userType,
          }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const resData = await response.data;
            return {
                data : resData,
                msg : "Customer updated successfully!",
            }
        } else {
            throw new Error('Unexpected response status: ' + response.status);
        }
    } catch (error) {
        let errorMessage = 'Error updating customer: ';
        
       
            errorMessage += error.message;
        

        alert(errorMessage);
        throw new Error(errorMessage);
    }
};


export const resetCustomerPassword = async (objectId) => {
    try {
        const pass = generateRandomPassword();
        const token = getCookie("access_token");
        const data = {
            "passwordProfile": {
                 "password": pass
             }
         }
        const response = await axios.patch(`http://localhost:3000/customer/reset-password/${objectId}`,data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });


            const resData = await response.data;
            return {
                data : pass,
                msg : "Customer updated successfully!",
            }
        
    } catch (error) {
        let errorMessage = 'Error updating customer: ';
        
       
            errorMessage += error.message;
        

        alert(errorMessage);
        throw new Error(errorMessage);
    }
};


export const getLastYearUsersCount = async () => {
    try {
        const token = getCookie("access_token");
        const response = await axios.get(`http://localhost:3000/customer/lastyear
        `, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
                });
                const resData = await response.data;
                return resData;
                } catch (error) {
                    let errorMessage = 'Error getting last year users count: ';
                    errorMessage += error.message;
                    alert(errorMessage);
                    throw new Error(errorMessage);
                    }
                
}

export const getThisYearUsersCount = async () => {
    try {
        const token = getCookie("access_token");
        const response = await axios.get(`http://localhost:3000/customer/thisyear
        `, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
                });
                const resData = await response.data;
                return resData;
                } catch (error) {
                    let errorMessage = 'Error getting last year users count: ';
                    errorMessage += error.message;
                    alert(errorMessage);
                    throw new Error(errorMessage);
                    }
                
}

export const getLastMonthUsersCount = async () => {
    try {
        const token = getCookie("access_token");
        const response = await axios.get(`http://localhost:3000/customer/LastMonth
        `, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
                });
                const resData = await response.data;
                return resData;
                } catch (error) {
                    let errorMessage = 'Error getting last year users count: ';
                    errorMessage += error.message;
                    alert(errorMessage);
                    throw new Error(errorMessage);
                    }
                
}

export const getPast12MonthsCustomers = async () => {
    try {
        const token = getCookie("access_token");
        const response = await axios.get(`http://localhost:3000/customer/pastyear
        `, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
                });
                const resData = await response.data;
                return resData;
                } catch (error) {
                    let errorMessage = 'Error getting last year users count: ';
                    errorMessage += error.message;
                    alert(errorMessage);
                    throw new Error(errorMessage);
                    }
                
}


export const getByType = async () => {
    try {
        const token = getCookie("access_token");
        const response = await axios.get(`http://localhost:3000/customer/type
        `, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
                });
                const resData = await response.data;
                return resData;
                } catch (error) {
                    let errorMessage = 'Error getting last year users count: ';
                    errorMessage += error.message;
                    alert(errorMessage);
                    throw new Error(errorMessage);
                    }
}
