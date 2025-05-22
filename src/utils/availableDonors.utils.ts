import Swal from "sweetalert2";
import { Donor } from "../types/Donor/Donor.typ";

const handleContactDonor = (donor: Donor) => {
  Swal.fire({
    title: "Contact Donor",
    text: `Do you want to contact ${donor.name}?`,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      // should be show user number
      Swal.fire({
        title: "Contact Number",
        text: `Phone : ${donor.phone_number}`,
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  });
};

export default handleContactDonor;
