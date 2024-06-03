import React, { useEffect, useState } from 'react';
import { updateCustomer } from '@/services/customer.service';
import { DialogDefault } from './dialog'
import { Alert, Input } from '@material-tailwind/react';

const UpdateCustomerDialog = ({ open, handleOpen, customer, fetch }) => {
     const [errorMessage, setErrorMessage] = useState('');
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
  setCustomerData(customer);
  console.log('Component initialized with customer data');
}, [customer]);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  console.log("Changing", name, "to", value);

  setCustomerData((prevCustomer) => {
    if (name.startsWith("signInNames[0].")) {
      const field = name.replace("signInNames[0].", "");
      const updatedSignInNames = prevCustomer.signInNames.map((signInName, index) =>
        index === 0 ? { ...signInName, [field]: value } : signInName
      );
      return { ...prevCustomer, signInNames: updatedSignInNames };
    } else {
      return { ...prevCustomer, [name]: value };
    }
  });
};


 
  const handleUpdateCustomer = async () => {
    try {
        const updatedCustomerData = await updateCustomer(customerData);
        console.log(updatedCustomerData.data);
        setCustomerData(updatedCustomerData.data.updatedCustomer); // Assuming you have updated customer data
        setErrorMessage(updatedCustomerData.data)
        fetch();
      } catch (error) {
        // Handle update error
        console.error('Error updating customer:', error);
      }
  };
  const signInName = customerData.signInNames && customerData.signInNames.length > 0 ? customerData.signInNames[0].value : '';

  return (
    <DialogDefault
      open={open}
      handleOpen={handleOpen}
      header={"Update Customer"}
      body={
        <>
          {errorMessage && !errorMessage.status && (
            <Alert open={open} color={'red'} onClose={() => setErrorMessage('')} style={{ width: '50%', margin: '0 auto' }}>
              {errorMessage}
            </Alert>
          )}
          {errorMessage && errorMessage.status && (
            <Alert open={open} color={'green'} onClose={() => setErrorMessage('')} style={{ width: '50%', margin: '0 auto' }}>
              {errorMessage.message}
            </Alert>
          )}
          { customerData && 
          <div className="flex flex-col gap-3">
          <Input label="Surname" name="surname" value={customerData.surname} onChange={handleInputChange} />
          <Input label="Given Name" name="givenName" value={customerData.givenName} onChange={handleInputChange} />
          <Input label="Display Name" name="displayName" value={customerData.displayName} onChange={handleInputChange} />
          <Input label="Email" name="signInNames[0].value" value={signInName ? signInName : ''} onChange={handleInputChange} />
          <Input label="ID Number" name="extension_1333e86bbc33478dbb6a47bc91d8cd23_iDNUMBER" value={customerData.extension_1333e86bbc33478dbb6a47bc91d8cd23_iDNUMBER} onChange={handleInputChange} />
          <Input label="Type" name="extension_1333e86bbc33478dbb6a47bc91d8cd23_tYPE" value={customerData.extension_1333e86bbc33478dbb6a47bc91d8cd23_tYPE} onChange={handleInputChange} />
          <Input label="Contract" name="extension_1333e86bbc33478dbb6a47bc91d8cd23_cONTRAT" value={customerData.extension_1333e86bbc33478dbb6a47bc91d8cd23_cONTRAT} onChange={handleInputChange} />
          <Input label="Part Number" name="extension_1333e86bbc33478dbb6a47bc91d8cd23_pART_NUM" value={customerData.extension_1333e86bbc33478dbb6a47bc91d8cd23_pART_NUM} onChange={handleInputChange} />
        </div>}
        </>
      }
      confirmText={"Save"}
      confirmAction={handleUpdateCustomer}
    />
  );
};

export default UpdateCustomerDialog;
