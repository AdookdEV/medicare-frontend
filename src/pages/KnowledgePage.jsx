import React from "react";
import { Button, Grid, Typography, Card, CardContent } from "@mui/material";
import ArticlesPage from "./knowledgePage/ArticlesPage.jsx";
import { Link } from 'react-router'; // убедитесь, что импортируете Link

const KnowledgeBasePage = () => {
  return (
      <div style={{ fontFamily: "'Roboto', sans-serif", padding: "20px" }}>
        <Typography variant="h4" gutterBottom align="center" style={{ margin: "20px 0" }}>
          Knowledge Base
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {ArticlesPage}
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", textAlign: "center" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Articles
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: "20px" }}>
                  Explore various articles on health, wellness, and lifestyle to improve your well-being.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/articles" // путь к страницам статей
                    style={{ textDecoration: "none" }}
                >
                  Go to Articles
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Ссылка на страницу FAQ (faqPage) */}
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", textAlign: "center" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  FAQ
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: "20px" }}>
                  Find answers to frequently asked questions and get more information about our services.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/faq" // путь к странице FAQ
                    style={{ textDecoration: "none" }}
                >
                  Go to FAQ
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
  );
};

export default KnowledgeBasePage;
