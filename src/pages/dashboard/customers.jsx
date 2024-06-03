import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Alert,
  Dialog,
} from "@material-tailwind/react";
import {
  LockClosedIcon,
  MagnifyingGlassCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { InputIcon } from "@/widgets/inputs/InputIcon";
import { getCustomers, addCustomer, resetCustomerPassword } from "@/services/customer.service";
import { DialogDefault } from "@/widgets/cards/dialog";
import { Link } from "react-router-dom";
import UpdateCustomerDialog from "@/widgets/cards/UpdateCustomerDialog";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    surname: "",
    givenName: "",
    displayName: "",
    email: "",
    password: "",
    userType: "Member",
    iDNUMBER: "",
    tYPE: "",
    cONTRAT: "",
    pART_NUM: "",
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [customerUpdate, setCustomerUpdate] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});

  const handleClosed = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleOpend = (content = {}) => {
    setDialogContent(content);
    setDialogOpen(true);
  };


  const handleOpenUp = (customerUp) => {
    setCustomerUpdate(customerUp);
    setOpenUpdate(!openUpdate);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleResetPassword = async (uid) => {

      const newPass = (await resetCustomerPassword(uid)).data;
      handleOpend({
        header: "New Password Request",
        body: (
          <div>
           
            <div className="w-72">
              New Password:
              <Input label="New Password" value={newPass} disabled />
            </div>
          </div>
        ),
        confirmText: "Confirm",
        confirmAction: handleClosed,
      });


  };


  const handleAddMember = async () => {
    const memberData = {
      surname: newMember.surname,
      givenName: newMember.givenName,
      displayName: newMember.displayName,
      signInNames: [{ type: "emailAddress", value: newMember.email }],
      passwordProfile: {
        password: newMember.password,
        forceChangePasswordNextLogin: false,
        enforceChangePasswordPolicy: false,
      },
      userType: newMember.userType,
      extension_1333e86bbc33478dbb6a47bc91d8cd23_iDNUMBER: newMember.iDNUMBER,
      extension_1333e86bbc33478dbb6a47bc91d8cd23_tYPE: newMember.tYPE,
      extension_1333e86bbc33478dbb6a47bc91d8cd23_cONTRAT: newMember.cONTRAT,
      extension_1333e86bbc33478dbb6a47bc91d8cd23_pART_NUM: newMember.pART_NUM,
      extension_1333e86bbc33478dbb6a47bc91d8cd23_requiresMigration: false,
    };

    try {
      const customer = await addCustomer(memberData);
      fetchCustomers();
      setIsFormOpen(false);
      setNewMember({
        surname: "",
        givenName: "",
        displayName: "",
        email: "",
        password: "",
        userType: "Member",
        iDNUMBER: "",
        tYPE: "",
        cONTRAT: "",
        pART_NUM: "",
      });
      console.log(customer);
      // setOpen(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to add member");
      console.error("Failed to add member:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      if (data) setCustomers(data);
      else return { dataCount: 0 };
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredUsers = useMemo(() => {
    return searchQuery !== ""
      ? customers.filter((user) => {
          const fullName = (user.displayName && user.displayName.toLowerCase() );
          return (
            (fullName && fullName.includes(searchQuery.toLowerCase())) ||
            user.signInNames[0]?.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.extension_1333e86bbc33478dbb6a47bc91d8cd23_pART_NUM &&
              user.extension_1333e86bbc33478dbb6a47bc91d8cd23_pART_NUM.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.extension_1333e86bbc33478dbb6a47bc91d8cd23_cONTRAT &&
              user.extension_1333e86bbc33478dbb6a47bc91d8cd23_cONTRAT.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.extension_1333e86bbc33478dbb6a47bc91d8cd23_iDNUMBER &&
              user.extension_1333e86bbc33478dbb6a47bc91d8cd23_iDNUMBER.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.extension_1333e86bbc33478dbb6a47bc91d8cd23_tYPE &&
              user.extension_1333e86bbc33478dbb6a47bc91d8cd23_tYPE.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.userType && user.userType.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        })
      : customers;
  }, [customers, searchQuery]);

  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / itemsPerPage);
  }, [filteredUsers.length, itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tableau d'utilisateur
          </Typography>
        </CardHeader>
        <CardBody className="w-full px-0 pt-0 pb-2">
          <Typography className="flex flex-col gap-10 sm:flex-row justify-between m-6 p-6" variant="h6" color="white">
            <InputIcon
              label="Chercher"
              icon={MagnifyingGlassCircleIcon}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button className="flex items-center gap-3" size="sm" onClick={handleOpen}>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </Typography>
          <UpdateCustomerDialog open={openUpdate} handleOpen={handleOpenUp} customer={customerUpdate} fetch={fetchCustomers} />
          <DialogDefault
            open={open}
            handleOpen={handleOpen}
            header={"Add customer"}
            body={
              <>
                {errorMessage && (
                  <Alert
                    open={!!errorMessage}
                    color={"red"}
                    onClose={() => setErrorMessage('')}
                    style={{ width: "50%", margin: "0 auto" }}
                  >
                    {errorMessage}
                  </Alert>
                )}
                <div className="flex flex-col gap-3">
                  <Input label="Surname" name="surname" value={newMember.surname} onChange={handleInputChange} />
                  <Input label="Given Name" name="givenName" value={newMember.givenName} onChange={handleInputChange} />
                  <Input label="Display Name" name="displayName" value={newMember.displayName} onChange={handleInputChange} />
                  <Input label="Email" name="email" value={newMember.email} onChange={handleInputChange} />
                  <Input label="Password" type="password" name="password" value={newMember.password} onChange={handleInputChange} />
                  <Input label="ID Number" name="iDNUMBER" value={newMember.iDNUMBER} onChange={handleInputChange} />
                  <Input label="Type" name="tYPE" value={newMember.tYPE} onChange={handleInputChange} />
                  <Input label="Contract" name="cONTRAT" value={newMember.cONTRAT} onChange={handleInputChange} />
                  <Input label="Part Number" name="pART_NUM" value={newMember.pART_NUM} onChange={handleInputChange} />
                </div>
              </>
            }
            confirmText={"Save"}
            confirmAction={handleAddMember}
          />

          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nom complet & Numero Partenaire", "Contract", "CIN", "Email", "Type", "UserType", "Actions"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(
                (
                  customer,
                  key
                ) => {
                  
                  const {
                    objectId,
                    extension_1333e86bbc33478dbb6a47bc91d8cd23_pART_NUM,
                    displayName,
                    signInNames,
                    extension_1333e86bbc33478dbb6a47bc91d8cd23_cONTRAT,
                    extension_1333e86bbc33478dbb6a47bc91d8cd23_iDNUMBER,
                    extension_1333e86bbc33478dbb6a47bc91d8cd23_tYPE,
                    userType,
                  } = customer;
                  const className = `py-3 px-5 ${key === customers.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={objectId}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              {displayName}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {extension_1333e86bbc33478dbb6a47bc91d8cd23_pART_NUM}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {extension_1333e86bbc33478dbb6a47bc91d8cd23_cONTRAT}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {extension_1333e86bbc33478dbb6a47bc91d8cd23_iDNUMBER}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-500">{signInNames[0]?.value}</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{extension_1333e86bbc33478dbb6a47bc91d8cd23_tYPE}</Typography>
                      </td>
                      <td className={className}>
                        <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600">
                          {userType}
                        </Typography>
                      </td>
                      <td className={`${className} flex flex-row gap-3`}>
                        <Link>
                          <PencilSquareIcon
                            onClick={() => handleOpenUp(customer)}
                            width={"25px"}
                          />
                        </Link>
                        <TrashIcon width={"25px"} />
                        <LockClosedIcon onClick={()=>{ handleResetPassword(objectId) }} width={"25px"} />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-6">
            <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
              Previous
            </Button>
            <Typography className="text-sm">
              Page {currentPage} of {totalPages}
            </Typography>
            <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
              Next
            </Button>
          </div>
        </CardBody>
        
      </Card>
      <Dialog open={dialogOpen} handler={handleClosed}>
        <div className="p-4 space-y-4">
          <div className="dialog-header">
            <Typography variant="h6">{dialogContent.header}</Typography>
          </div>
          <div className="dialog-body">
            {dialogContent.body}
          </div>
          {dialogContent.confirmText && (
            <div className="dialog-footer">
              <Button variant="text" color="red" onClick={handleClosed}>
                Cancel
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={dialogContent.confirmAction}
              >
                {dialogContent.confirmText}
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    </div>

  );
}
