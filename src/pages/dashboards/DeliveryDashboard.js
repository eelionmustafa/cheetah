import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Chip,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  LocalShipping,
  CheckCircle,
  PendingActions,
  Warning,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MotionPaper = motion(Paper);

// Sample delivery data
const sampleDeliveries = [
  {
    id: 1,
    address: '123 Main St, City',
    customer: 'John Doe',
    status: 'pending',
    time: '10:30 AM',
    items: 3,
    priority: 'high',
  },
  {
    id: 2,
    address: '456 Oak Ave, Town',
    customer: 'Jane Smith',
    status: 'in_progress',
    time: '11:45 AM',
    items: 2,
    priority: 'medium',
  },
  {
    id: 3,
    address: '789 Pine Rd, Village',
    customer: 'Bob Wilson',
    status: 'completed',
    time: '1:15 PM',
    items: 1,
    priority: 'low',
  },
];

const DeliveryDashboard = () => {
  const { t } = useTranslation();
  const [deliveries, setDeliveries] = useState(sampleDeliveries);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="success" />;
      case 'in_progress':
        return <PendingActions color="warning" />;
      case 'pending':
        return <Warning color="info" />;
      default:
        return <LocalShipping />;
    }
  };

  const handleStatusChange = (deliveryId, newStatus) => {
    setDeliveries(deliveries.map(delivery =>
      delivery.id === deliveryId ? { ...delivery, status: newStatus } : delivery
    ));
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesFilter = filter === 'all' || delivery.status === filter;
    const matchesSearch = delivery.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         delivery.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      elevation={3}
      sx={{ p: 3 }}
    >
      <Box>
        <Typography variant="h5" color="primary" gutterBottom>
          {t('delivery.deliveryDashboard')}
        </Typography>
        
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {t('delivery.todaysDeliveries')}
                </Typography>
                <Typography variant="h4">
                  {deliveries.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {t('delivery.completed')}
                </Typography>
                <Typography variant="h4">
                  {deliveries.filter(d => d.status === 'completed').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {t('delivery.pending')}
                </Typography>
                <Typography variant="h4">
                  {deliveries.filter(d => d.status === 'pending').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Filters and Search */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>{t('delivery.filterStatus')}</InputLabel>
                <Select
                  value={filter}
                  label={t('delivery.filterStatus')}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <MenuItem value="all">{t('delivery.allDeliveries')}</MenuItem>
                  <MenuItem value="pending">{t('delivery.pending')}</MenuItem>
                  <MenuItem value="in_progress">{t('delivery.inProgress')}</MenuItem>
                  <MenuItem value="completed">{t('delivery.completed')}</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label={t('delivery.searchAddress')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
            </Box>
          </Grid>

          {/* Deliveries List */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('delivery.customer')}</TableCell>
                    <TableCell>{t('delivery.address')}</TableCell>
                    <TableCell>{t('delivery.time')}</TableCell>
                    <TableCell>{t('delivery.items')}</TableCell>
                    <TableCell>{t('delivery.status')}</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDeliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell>{delivery.customer}</TableCell>
                      <TableCell>{delivery.address}</TableCell>
                      <TableCell>{delivery.time}</TableCell>
                      <TableCell>{delivery.items}</TableCell>
                      <TableCell>{t(`delivery.${delivery.status}`)}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleStatusChange(delivery.id, 'completed')}
                          disabled={delivery.status === 'completed'}
                        >
                          {t('delivery.complete')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </MotionPaper>
  );
};

export default DeliveryDashboard; 