import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider, Modal } from "@mui/material";

export default function AlertModal({ isModalOpen, onClose }: any) {
  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "2px solid #000",
          maxWidth: 400,
        }}
      >
        <Card sx={{ minWidth: 275, backgroundColor: "#222327" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Oops! É necessário fazer login
            </Typography>
            <Divider sx={{ margin: 2 }}></Divider>
            <Typography variant="body1">
              Entre na sua conta para continuar e tenha uma experiência ainda
              melhor. Faça o login agora mesmo!
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              size="small"
              sx={{ bgcolor: "gray", paddin: 5, margin: 1 }}
              variant="contained"
              onClick={onClose}
            >
              Fechar
            </Button>
            <Button
              size="small"
              sx={{ bgcolor: "#27b4a4" }}
              href="/login"
              variant="contained"
            >
              Fazer login
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}
