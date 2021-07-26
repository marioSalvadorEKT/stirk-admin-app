import React, { FC, useState } from 'react'
import { Layout, PageBlock, Input, Button } from "vtex.styleguide";
import logo from './Images/LogoStyrk.png'



const merchantController: FC = () => {


  const [settingsLoading, setSettingsLoading] = useState(false)
  const [settingsState, setSettingsState] = useState({
    styrkToken: '',
    appKey: 'vtexappkey-vinneren-ALIOTW',
    appToken: 'FPJXIAMZUMFGRUYKHJNJPNGTYQKKDCGTRQRBSWFIKZPVMCPMCKZQCSPSIPZRQCWRGMOBCXRKEEYQXKHVBXHTDPQZAZSDWNSICYPZNNKFSOLYUZVXIEQSUDOQVPADEOOR',
    vtexURL: 'https://vinneren.vtexcommercestable.com.br',
    imageVtexURL: 'https://vinneren.vtexcommercestable.com.br'
  })

  const fetchToken = async (token: any)=> {
    setSettingsLoading(true)
    fetch(`http://styrk-vinneren.us-east-1.elasticbeanstalk.com:8093/styrk/api/merchant/validateinstalltoken?installToken=${token}`, {
      mode: 'cors',
      method: 'GET',
      credentials: 'omit',
      headers: { 'Content-type': 'application/json' },
    })
    .then((res) => res.json())
    .then((response)=>{
      console.log(response)
      const res = response.response;

      if(response.code === 200){
        setSettingsState({
          ...settingsState,
          appKey: res.appKey,
          appToken: res.appToken,
          imageVtexURL: res.imageVtexURL,
          vtexURL: res.vtexURL
        })
      }
      setSettingsLoading(false)
    })
    .catch((err) =>{
      console.log(err)
      setSettingsLoading(false)
    });
  }


  return (
    <Layout>

      <section className="pt8 pl4">
        <img src={logo} alt="Styrk" />
      </section>
      <section className="pt7 pl4 pr4 ">
        <PageBlock
        variation="full"
        >
          <section className="pb4">
            <Input
              label="Styrk Token"
              value={settingsState.styrkToken}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setSettingsState({
                  ...settingsState,
                  styrkToken: e.currentTarget.value,
                })
              }
              token
            />
          </section>
          <section className="pb4">
            <Input
              label="App Key"
              value={settingsState.appKey}
              disabled={true}
              appKey
            />
          </section>
          <section className="pb4">
            <Input
              label="App Token"
              value={settingsState.appToken}
              disabled={true}
              appToken
            />
          </section>
          <section className="pb4">
            <Input
              label="VTEX URL"
              value={settingsState.vtexURL}
              disabled={true}
              vtexURL
            />
          </section>
          <section className="pb4">
            <Input
              label="Image VTEX URL"
              value={settingsState.imageVtexURL}
              disabled={true}
              imageVtexURL
            />
          </section>
          <section className="pt4">
            <Button
              variation="primary"
              onClick={() => fetchToken(settingsState.styrkToken)}
              isLoading={settingsLoading}
              disabled={
                !settingsState.styrkToken
              }
            >
              Consultar
            </Button>

          </section>
        </PageBlock>
      </section>
    </Layout>
  )
}

export default merchantController
