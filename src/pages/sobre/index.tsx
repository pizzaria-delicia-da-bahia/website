import { NextPage } from "next";
import { SobreStyle } from "@styles/pages/sobre/styles";
import Text from "@components/text";

const Sobre: NextPage = () => {
  return (
    <SobreStyle>
      <div className="frame">
        <iframe
          id="frame"
          width="320"
          height="568"
          src="https://www.instagram.com/p/B5GnxoQnH6o/embed"
          frameBorder="0"
        ></iframe>
      </div>
      <div className="text">
        <Text type="title">QUEM SOMOS</Text>
        <p>
          Nascida em Janeiro de 2013, a <b>Pizzaria Delicia da Bahia</b>{" "}
          conquista seus clientes através de um trabalho de excelência, prezando
          por superar as expectativas dos clientes. <i>Antônio Costa</i>,
          juntamente com sua esposa
          <i> Elisandra Costa</i>, foram os responsáveis por dar início a um
          sonho, que se tornou realidade aos poucos, com muita luta e dedicação
          por parte de todos os envolvidos.
          <br />
          <br />
          Nosso foco está em surpreender nossos clientes com sabores de extrema
          qualidade, uma massa deliciosa, entregas ágeis, recheio farto e
          suculento, e um atendimento agradável, visando proporcionar uma ótima
          experiência de compras aos nossos clientes e deixá-los com água na
          boca com nossos sabores irresistíveis!
          <br />
          Buscamos sempre renovar nosso cardápio afim de trazer novidades nos
          nossos sabores, e produtos que oferecemos, bem como estar sempre em
          constante melhoria da nossa qualidade.
          <br />
          Não deixe de dar uma conferida e conhecer nossas pizzas, e peça seu
          delivery no conforto do seu lar!
        </p>
      </div>
    </SobreStyle>
  );
};

export default Sobre;
