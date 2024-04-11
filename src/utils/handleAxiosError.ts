import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface ErrorProps {
  text: string;
  error: AxiosError;
  navigate: ReturnType<typeof useNavigate>;
}

export function handleAxiosError({ text, error, navigate }: ErrorProps) {
  if (error.response?.status === 404) {
    navigate("/404");
  } else {
    const htmlContent = `
    <div style="margin-bottom: 10px">${text} ${error?.message}</div>
    <div style="text-align: center;">다시 시도해주세요</div>
  `;
    Swal.fire({
      title: "Sorry",
      html: htmlContent,
      width: 600,
      padding: "3em",
      color: "#44b044",
      background: "#fff",
      backdrop: `
          rgba(0,0,0,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
        `,
      confirmButtonColor: "#32cd32",
      confirmButtonText: "Close",
    });
  }
}
