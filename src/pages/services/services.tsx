import {
  ArrowContainer,
  BoxContainer,
  ServicesContainer,
  MainContainer,
  StatsContainer,
} from "./servicesStyles";
import ArrowIcon from "../../assets/arrow.png";
import Footer from "../../components/footer/footer";
import HeaderLogged from "../../components/headerLogged/headerLogged";
import { ModalContext } from "../../contexts/ModalContext";
import NewContract from "../../components/newContract/newContract";
import MyContract from "../../components/myContract/myContract";
import NewSelection from "../../components/newSelection/newSelection";
import MySelection from "../../components/mySelection/mySelection";
import SearchSelection from "../../components/searchSelection/searchSelection";
import { useContext, useEffect, useState } from "react";
import { AgreementStatus, SelectionStatus } from "../../enums/ServiceStatus";
import { UserContext } from "../../contexts/UserContext";
import { AccountType } from "../../enums/AccountType";
import { Doughnut } from "react-chartjs-2";

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

function Services() {
  const { id, type, fetchAgreementStatsByUser } = useContext(UserContext);

  const {
    toogleNewContractVisibility,
    toogleNewSelectionVisibility,
    toogleMyContractVisibility,
    toogleMySelectionVisibility,
    toogleSearchSelectionVisibility,
  } = useContext(ModalContext);

  const [contractFilter, setContractFilter] = useState(
    AgreementStatus.accepted
  );

  const [selectionFilter, setSelectionFilter] = useState(
    SelectionStatus.active
  );

  const selectionServices = [
    { title: "Create selection", toogle: () => toogleNewSelectionVisibility() },
    {
      title: "Active selections",
      toogle: () => {
        toogleMySelectionVisibility();
        setSelectionFilter(SelectionStatus.active);
      },
    },
    {
      title: "Waitlist",
      toogle: () => {
        toogleMySelectionVisibility();
        setSelectionFilter(SelectionStatus.onHold);
      },
    },
    {
      title: "History",
      toogle: () => {
        toogleMySelectionVisibility();
        setSelectionFilter(SelectionStatus.closed);
      },
    },
  ];

  const [agreementChartData, setAgreementChartData] = useState<any>({
    datasets: [],
  });
  const [agreementChartLabels, setAgreementChartLabels] = useState<string[]>(
    []
  );
  const [agreementChartValues, setAgreementChartValues] = useState<string[]>(
    []
  );
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      arc: {
        borderAlign: "inner",
        borderWidth: 1,
      },
      title: {
        display: true,
        text: "Agreement history",
      },
    },
  };

  useEffect(() => {
    if (
      agreementChartLabels.length === 0 &&
      agreementChartValues.length === 0
    ) {
      const [labels, values]: any[] = [[], []];
      fetchAgreementStatsByUser(id).then((stats: any[]) => {
        stats
          .sort((statA, statB) => statA.status.localeCompare(statB.status))
          .forEach((value) => {
            labels.push(value.status);
            values.push(value.total);
          });

        setAgreementChartLabels(labels);
        setAgreementChartValues(values);
      });
    }
  }, [
    agreementChartLabels,
    agreementChartValues,
    fetchAgreementStatsByUser,
    id,
  ]);

  useEffect(() => {
    setAgreementChartData({
      labels: agreementChartLabels,
      datasets: [
        {
          data: agreementChartValues,
          backgroundColor: agreementChartValues.map(randomColor),
        },
      ],
    });
  }, [agreementChartLabels, agreementChartValues]);

  return (
    <>
      <HeaderLogged />
      <MainContainer>
        <BoxContainer>
          <StatsContainer>
            <h2>Your stats</h2>
            <Doughnut
              options={chartOptions}
              data={agreementChartData}
            ></Doughnut>
          </StatsContainer>

          <ServicesContainer>
            <h2>Contracts</h2>
            {type === AccountType.enterprise ? (
              <ArrowContainer onClick={() => toogleNewContractVisibility()}>
                <span>Create contracts</span>
                <img alt="Criar contrato" src={ArrowIcon} />
              </ArrowContainer>
            ) : (
              <></>
            )}

            <ArrowContainer
              onClick={() => {
                toogleMyContractVisibility();
                setContractFilter(AgreementStatus.accepted);
              }}
            >
              <span>Active contracts</span>
              <img alt="Contratos ativos" src={ArrowIcon} />
            </ArrowContainer>

            {type === AccountType.enterprise ? (
              <ArrowContainer
                onClick={() => {
                  toogleMyContractVisibility();
                  setContractFilter(AgreementStatus.pending);
                }}
              >
                <span>Pending contracts</span>
                <img alt="Pending contracts" src={ArrowIcon} />
              </ArrowContainer>
            ) : (
              <></>
            )}

            <ArrowContainer
              onClick={() => {
                toogleMyContractVisibility();
                setContractFilter(AgreementStatus.completed);
              }}
            >
              <span>History</span>
              <img alt="History" src={ArrowIcon} />
            </ArrowContainer>
          </ServicesContainer>

          <ServicesContainer>
            <h2>Selections</h2>

            {type === AccountType.enterprise ? (
              selectionServices.map((service) => (
                <ArrowContainer onClick={() => service.toogle()}>
                  <span>{service.title}</span>
                  <img alt={service.title} src={ArrowIcon} />
                </ArrowContainer>
              ))
            ) : (
              <ArrowContainer onClick={() => toogleSearchSelectionVisibility()}>
                <span>Search selection</span>
                <img alt="Buscar seleções" src={ArrowIcon} />
              </ArrowContainer>
            )}
          </ServicesContainer>
        </BoxContainer>
      </MainContainer>
      <Footer />

      <NewContract />
      <MyContract filter={contractFilter} />
      <NewSelection />
      <MySelection filter={selectionFilter} />
      {type === AccountType.enterprise ? <></> : <SearchSelection />}
    </>
  );
}

export default Services;
