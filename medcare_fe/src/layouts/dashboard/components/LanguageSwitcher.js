import { MenuItem, Select, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import TranslateIcon from "@mui/icons-material/Translate";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { value: "en", label: t("language.english"), icon: <PublicIcon /> },
    { value: "hi", label: t("language.hindi"), icon: <TranslateIcon /> },
  ];

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      variant="outlined"
      value={i18n.language}
      onChange={handleLanguageChange}
      sx={{
        width: 180, // Adjust width
        height: 40, // Adjust height
        backgroundColor: "#f5f5f5", // Optional: Light gray background
        borderRadius: 2, // Optional: Rounded corners
        margin: 2,
      }}
      renderValue={(selected) => {
        const selectedLang = languages.find((lang) => lang.value === selected);
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {selectedLang?.icon}
            {selectedLang?.label}
          </div>
        );
      }}
    >
      {languages.map((lang) => (
        <MenuItem key={lang.value} value={lang.value}>
          <ListItemIcon>{lang.icon}</ListItemIcon>
          <ListItemText primary={lang.label} primaryTypographyProps={{ fontSize: 14 }}/>
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
