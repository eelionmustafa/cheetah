import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MotionPaper = motion(Paper);

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    siteName: 'My E-Commerce Store',
    siteDescription: 'Your one-stop shop for all your needs',
    contactEmail: 'contact@example.com',
    currency: 'USD',
    language: 'en',
    maintenanceMode: false,
    enableNotifications: true,
    orderConfirmationEmail: true,
    lowStockAlert: true,
    lowStockThreshold: 10,
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    handleChange(event);
  };

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      elevation={3}
      sx={{ p: 3 }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('dashboard.settings')}
        </Typography>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {t('common.settingsSaved')}
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('settings.general')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label={t('settings.siteName')}
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label={t('settings.siteDescription')}
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                />
                <TextField
                  label={t('settings.contactEmail')}
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>{t('settings.currency')}</InputLabel>
                  <Select
                    name="currency"
                    value={settings.currency}
                    label={t('settings.currency')}
                    onChange={handleChange}
                  >
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                    <MenuItem value="GBP">GBP (£)</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>{t('settings.language')}</InputLabel>
                  <Select
                    name="language"
                    value={settings.language}
                    label={t('settings.language')}
                    onChange={handleLanguageChange}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('settings.system')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                      name="maintenanceMode"
                    />
                  }
                  label={t('settings.maintenanceMode')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableNotifications}
                      onChange={handleChange}
                      name="enableNotifications"
                    />
                  }
                  label={t('settings.enableNotifications')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.orderConfirmationEmail}
                      onChange={handleChange}
                      name="orderConfirmationEmail"
                    />
                  }
                  label={t('settings.orderConfirmationEmail')}
                />
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  {t('settings.inventory')}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.lowStockAlert}
                      onChange={handleChange}
                      name="lowStockAlert"
                    />
                  }
                  label={t('settings.lowStockAlert')}
                />
                <TextField
                  label={t('settings.lowStockThreshold')}
                  name="lowStockThreshold"
                  type="number"
                  value={settings.lowStockThreshold}
                  onChange={handleChange}
                  fullWidth
                  disabled={!settings.lowStockAlert}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="large"
            >
              {t('common.saveSettings')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </MotionPaper>
  );
};

export default Settings; 