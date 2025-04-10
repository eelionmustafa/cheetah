import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  Divider,
  Rating,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Settings as SettingsIcon,
  RateReview as RateReviewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { getUserReviews, updateReview, deleteReview } from '../services/reviewService';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const Profile = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editReview, setEditReview] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [userData, setUserData] = useState({
    id: 1, // This should come from your auth context/state
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, City, Country',
  });

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    try {
      setLoading(true);
      const reviews = await getUserReviews(userData.id);
      setUserReviews(reviews);
      setError(null);
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (review) => {
    setEditReview(review);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        setUserReviews(userReviews.filter(review => review.id !== reviewId));
      } catch (err) {
        console.error('Error deleting review:', err);
      }
    }
  };

  const handleUpdateReview = async () => {
    try {
      await updateReview(editReview.id, {
        rating: editReview.rating,
        comment: editReview.comment
      });
      setUserReviews(userReviews.map(review => 
        review.id === editReview.id ? editReview : review
      ));
      setOpenDialog(false);
      setEditReview(null);
    } catch (err) {
      console.error('Error updating review:', err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Updated profile:', userData);
  };

  const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <MotionPaper
              elevation={3}
              sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 3 }}
            >
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
              >
                {userData.firstName[0]}
                {userData.lastName[0]}
              </Avatar>
              <Box>
                <Typography variant="h4" color="primary" gutterBottom>
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userData.email}
                </Typography>
              </Box>
            </MotionPaper>
          </Grid>

          {/* Profile Content */}
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab icon={<PersonIcon />} label="Personal Info" />
                <Tab icon={<ShoppingBagIcon />} label="Orders" />
                <Tab icon={<RateReviewIcon />} label="Reviews" />
                <Tab icon={<SettingsIcon />} label="Settings" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        multiline
                        rows={3}
                        value={userData.address}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <Typography variant="h6" gutterBottom>
                  Order History
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  No orders found.
                </Typography>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Typography variant="h6" gutterBottom>
                  My Reviews
                </Typography>
                {loading ? (
                  <Typography>Loading reviews...</Typography>
                ) : error ? (
                  <Typography color="error">{error}</Typography>
                ) : userReviews.length > 0 ? (
                  <Grid container spacing={2}>
                    {userReviews.map((review) => (
                      <Grid item xs={12} key={review.id}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="h6" component="div">
                                {review.productName}
                              </Typography>
                              <Box>
                                <IconButton
                                  size="small"
                                  onClick={() => handleEditClick(review)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteClick(review.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Rating value={review.rating} readOnly precision={0.5} />
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {new Date(review.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Typography variant="body1">
                              {review.comment}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    You haven't written any reviews yet.
                  </Typography>
                )}
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Change Password
                </Button>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </MotionBox>

      {/* Edit Review Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Rating
              value={editReview?.rating || 0}
              onChange={(event, newValue) => {
                setEditReview(prev => ({ ...prev, rating: newValue }));
              }}
              precision={0.5}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              margin="normal"
              label="Review Comment"
              value={editReview?.comment || ''}
              onChange={(e) => {
                setEditReview(prev => ({ ...prev, comment: e.target.value }));
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateReview} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 