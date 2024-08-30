import React, { useState, useEffect } from "react";
import "./App.css";
import validatePositiveInt from './functions/validatePositiveInt'
import ProgressBar from './components/ProgressBar'
import Select from './components/Select'
import Range from './components/Range'
import RbGroup from './components/RbGroup'
import NumImp from './components/NumImp'
import TextArea from './components/TextArea'
import File from './components/File'
import Button from './components/Button'
import saveText from './functions/saveText'
import Clock from './components/Clock'
import ChbGroup from './components/ChbGroup'
import Image from './components/Image'


function App() {

  const [initialCountDown, setInitialCountDown] = useState(0)
  const [countDown, setCountDown] = useState(0)
  const [fruit, setFruit] = useState("maliny") 
  const [amount, setAmount] = useState(3)
  const [quality, setQuality] = useState("A")
  const [mem1, setMem1] = useState(0)
  const [mem2, setMem2] = useState(0)
  const [text, setText] = useState("")
  const [btn, setBtn] = useState("")
  const [reset, setReset] = useState(0)
  const [imgVisible, setImgVisible] = useState(true)



  const product = mem1 * mem2;


    useEffect(()=>{
    let temp = prompt("zadejte počet sekund pro odpočet",10);
    while(!validatePositiveInt(temp)){
      temp = prompt("zadejte počet sekund pro odpočet",10);
    }
    setInitialCountDown(temp)
    setCountDown(temp)
    setReset(temp)
  },[])

  useEffect(()=>{
    if(countDown > 0){
      const timer = setInterval(() =>{
        setCountDown(countDown - 1)
      },1000)
      return () => clearInterval(timer)
    }
  },[countDown])

  const progress =
    countDown > 0 ? ((initialCountDown - countDown) / initialCountDown) * 100 : 100;

  const fruits = ["jahody", "maliny", "borůvky", "angrešt", "ostružiny"];

  

  const handleData = (data, source) =>{
    switch(source){
      case "sel-fruits":{
        setFruit(data); break; 
      }
      case "rng-amount":{
        setAmount(data); break; 
      }
      case "rbg-quality":{
        setQuality(data); break; 
      }
      case "num-mem1":{
        setMem1(data);break;
      }
      case "num-mem2":{
        setMem2(data);break;
      }
      case "txa-id" : {
        setText(data);break;
      }
      case "file-load" : {
        setText(data);break;
      }
      case "check-btns" : {
        setBtn(data);break;
      }
      default: break;
    }
  }

  const handleEvent = (source) => {
    switch(source){
      case "btn-download" :{saveText(text);break;}
      case "reset-progress" : {setCountDown(reset);break}
      case "img-visible" : {setImgVisible(true);break}
      case "img-invisible" : {setImgVisible(false);break}
      default: break;
    }
  }

  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row p-4">
          <div className="col-6">
            <Select 
              dataIn={fruits} 
              id="sel-fruits" 
              selectedValue={fruit} 
              label="Ovoce" 
              handleData={handleData} 
            />
            <Range 
              id="rng-amount" 
              label="Množství" 
              min="0" 
              max="20" 
              dataIn={amount} 
              handleData={handleData} 
            />
            <p>
              {fruit},{amount} kg, jakost {quality}
            </p>
            <div className="row">
              <div className="col-6">
                <NumImp 
                dataIn = {mem1}
                label = "činitel č.1"
                handleData = {handleData}
                id = "num-mem1"
                />
              </div>
              <div className="col-6">
              <NumImp 
                dataIn = {mem2}
                label = "činitel č.2"
                handleData = {handleData}
                id = "num-mem2"
                />
              </div>
              Výsledek: {product}
              <TextArea 
              label = "operace s textem"
              dataIn = {text}
              handleData = {handleData}
              height = {150}
              id = "txa-id"
              />
              <div className="row mt-2">
                <div className="col-6">
                <File
                  label = "Načti text ze souboru"
                  handleData = {handleData}
                  id = "file-load"
                />
                </div>
                <div className="col-6">
                <Button
                label = "stáhni soubor s textem"
                handleEvent = {handleEvent}
                id = "btn-download"
                />
                </div>
                <div>
                  <Clock />, počet zatrhnutých checkboxů je: {btn.length}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
          <RbGroup label="vyber hodnotu" 
          id="rbg-quality"
          handleData={handleData} 
          selectedValue={quality}
          dataIn={[
            {label: "Jakost A", value: "A"},
            {label: "Jakost B", value: "B"},
            {label: "Jakost C", value: "C"}
            ]}
          />
          <ChbGroup 
          label = "Checkbox"
          id = "check-btns"
          dataIn = {[
            {label: "CheckBox 1", value: "1"},
            {label: "CheckBox 2", value: "2"},
            {label: "Checkbox 3", value: "3"},
            {label: "Checkbox 4", value: "4"},
            {label: "Checkbox 5", value: "5"},
            {label: "Checkbox 6", value: "6"},
            {label: "Checkbox 7", value: "7"},
            {label: "Checkbox 8", value: "8"},
          ]}
          handleData={handleData}
          selectedValue={btn}
          />
          <div className="p-3 d-grid">
            <Button 
            label = "Resetuj ProgressBar"
            handleEvent = {handleEvent}
            id = "reset-progress"
            />
          </div>
          <div className="row p-3">
            <div className="col-6 d-grid">
              <Button 
              label = "Zobraz obrázek"
              handleEvent = {handleEvent}
              id = "img-visible"
              />
            </div>
            <div className="col-6 d-grid">
              <Button 
                label = "Skryj obrázek"
                handleEvent = {handleEvent}
                id = "img-invisible"
              />
            </div>
            <div className="p-3 w-100 d-flex justify-content-center">
                <Image 
                  source = "https://veetektest.g6.cz/projects/react-form-excercise/static/media/flower.06571f9c9d8a038a1f4a.jpg"
                  width = "80%"
                  enabled = {imgVisible}
                  id = "tulipany"
                />
              </div>
          </div>
        </div>
        <ProgressBar id="pgb-progress" dataIn={progress} />
        </div>
    </div>
  </div>
  );
}

export default App;
