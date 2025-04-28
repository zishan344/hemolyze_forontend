// import { RequestStatus } from "../../../types/Dashboard/DonationRequests.types";
// import { Clock } from "lucide-react";

// interface RequestAcceptProps {
//   status: RequestStatus;
//   loading: boolean;
//   requestId: number;
//   // fetchAcceptedDonationRequest: (requestId: number) => Promise<void>;
//   // acceptedRequest?: AcceptedRequestItem;
//   handleAcceptRequest: (requestId: number) => Promise<void>;
//   handleUpdateStatus: (
//     acceptedRequestId: number,
//     status: string
//   ) => Promise<void>;
//   //  requestAcceptedId?: number;
//   // onAcceptRequest: (requestId: number) => Promise<void>;
//   // onUpdateDonationStatus?: (status: DonationStatus) => Promise<void>;
// }

// const RequestAccept = ({
//   handleAcceptRequest,
//   requestId,
//   // acceptedRequest,
//   status,
//   loading,
// }: RequestAcceptProps) => {
//   // Handle different donation statuses for accepted requests

//   return (
//     <div className="w-full lg:w-64 p-6 flex flex-col justify-between">
//       {/* Request Status */}
//       <div className="text-center mb-4">
//         <p className="text-sm mb-2">Request Status</p>
//         <div
//           className={`badge badge-lg ${
//             status === "accepted"
//               ? "badge-info"
//               : status === "completed"
//               ? "badge-success"
//               : status === "cancelled"
//               ? "badge-error"
//               : "badge-warning"
//           }`}>
//           {status.toUpperCase()}
//         </div>
//       </div>

//       {/* Show different actions based on request status and acceptance status */}
//       {status === "pending" && (
//         <button
//           className="btn btn-primary w-full"
//           onClick={() => handleAcceptRequest(requestId)}
//           disabled={loading}>
//           {loading ? (
//             <>
//               <span className="loading loading-spinner loading-xs"></span>
//               Processing...
//             </>
//           ) : (
//             "Accept Request"
//           )}
//         </button>
//       )}

//       {/* If the request is completed or cancelled and not accepted by this user */}
//       {(status === "completed" || status === "cancelled") && (
//         <div className="space-y-2">
//           <div
//             className={`alert ${
//               status === "completed" ? "alert-success" : "alert-error"
//             } p-2 text-xs`}>
//             <span>
//               {status === "completed"
//                 ? "This request has been fulfilled"
//                 : "This request has been cancelled"}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Render donation actions if the user has accepted this request */}
//       {/* Contact button for accepted requests */}
//       {
//         <button className="btn btn-outline btn-sm w-full mt-2">
//           Contact Recipient
//         </button>
//       }

//       {/* Accepted by another donor notification */}
//       {status === "accepted" && (
//         <div className="alert alert-info p-2 text-xs">
//           <Clock size={16} />
//           <span>This request has been accepted by another donor</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestAccept;
