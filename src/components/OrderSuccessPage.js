// import React from "react";
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   Card,
//   CardContent,
//   Divider,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import Confetti from "react-confetti";
// import useWindowSize from "react-use/lib/useWindowSize";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// const OrderSuccessPage = () => {
//   const user = useSelector((store) => store.user);
//   const { width, height } = useWindowSize();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { amount, id, payment_id, type, useraddress } = location.state || {};

  
//   const updatePaymentInfo = async () => {
//     try {
//       const paymentDetails = {
//         order_id: id,
//         transaction_id: payment_id,
//         name: user.displayName,
//         user_id: user.uid,
//         amount: amount,
//         type: type,
//       };
//       await axios.post("http://localhost:4000/paymentdetails", paymentDetails);
//     } catch (error) {
//       console.log("Error updating details " + error);
//     }
//   };

//   React.useEffect(() => {
//     updatePaymentInfo();
//   }, []);

//   const handleTrackOrder = () => {
//     navigate("/tracker", { state: { useraddress } });
//   };

//   return (
//     <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8, mb: 8 }}>
//       <Confetti width={width} height={height} numberOfPieces={200} />
//       <Card
//         raised
//         sx={{ padding: "20px", borderRadius: "12px", position: "relative" }}
//       >
//         <CardContent>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <CheckCircleIcon sx={{ fontSize: 80, color: "#4CAF50", mb: 2 }} />
//             <Typography
//               variant="h4"
//               sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
//             >
//               Order Placed Successfully!
//             </Typography>
//             <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
//               Your order has been placed and is being processed. You will
//               receive an email confirmation shortly.
//             </Typography>

//             <Box sx={{ width: "100%", mb: 2 }}>
//               <Divider sx={{ mb: 2 }} />
//               <Typography variant="h6" sx={{ mb: 1 }}>
//                 Order Summary:
//               </Typography>
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//               >
//                 <Typography variant="body2">Order ID:</Typography>
//                 <Typography variant="body2">{id}</Typography>
//               </Box>
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//               >
//                 <Typography variant="body2">Total Amount:</Typography>
//                 <Typography variant="body2">₹{amount}</Typography>
//               </Box>
//               <Divider sx={{ mt: 2 }} />
//             </Box>

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleTrackOrder}
//               sx={{
//                 textTransform: "none",
//                 fontSize: "16px",
//                 px: 4,
//                 py: 1,
//                 backgroundColor: "#1976d2",
//                 "&:hover": {
//                   backgroundColor: "#115293",
//                 },
//               }}
//             >
//               Track Order
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default OrderSuccessPage;


import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "./utils/constants";

const OrderSuccessPage = () => {
  const user = useSelector((store) => store.user);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, id, payment_id, type } = location.state || {};

  // API call to update payment information
  const updatePaymentInfo = async () => {
    try {
      const paymentDetails = {
        order_id: id,
        transaction_id: payment_id,
        name: user.displayName,
        userId: user.uid,
        amount: amount,
        type: type,
      };
      await axios.post(BASE_URL+"/paymentdetails", paymentDetails);
    } catch (error) {
      console.error("Error updating payment details: " + error.message);
    }
  };

  // API call to fetch order details
  const fetchOrderDetails = async () => {
    try {
      navigate("/orderhistory");
    } catch (error) {
      console.error("Error fetching order details: " + error.message);
    }
  };

  React.useEffect(() => {
    updatePaymentInfo();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8, mb: 8 }}>
      <Confetti width={width} height={height} numberOfPieces={200} />
      <Card
        raised
        sx={{ padding: "20px", borderRadius: "12px", position: "relative" }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 80, color: "#4CAF50", mb: 2 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
            >
              Order Placed Successfully!
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
              Your order has been placed and is being processed. You will
              receive an email confirmation shortly.
            </Typography>

            <Box sx={{ width: "100%", mb: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Order Summary:
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Order ID:</Typography>
                <Typography variant="body2">{id}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Total Amount:</Typography>
                <Typography variant="body2">₹{amount}</Typography>
              </Box>
              <Divider sx={{ mt: 2 }} />
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={fetchOrderDetails}
              sx={{
                textTransform: "none",
                fontSize: "16px",
                px: 4,
                py: 1,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              View Order Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderSuccessPage;
