import copyIcon from '../assets/copy-icon.svg'
import { useState, useContext, useEffect } from 'react'
// import axios from 'axios'
import { FileContext } from '../contexts/FileContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
function SendForm({
    startSend,
    fileURL,
    getIsSent,
    // percentage
}) {
    const { sendMail, setShowToast, showToast: { show, message, type } } = useContext(FileContext);

    const [sendForm, setSendForm] = useState({
        fromEmail: "",
        toEmail: ""
    });
    console.log(fileURL)
    const [copied,setCopied] = useState(false);
    const [inputValue,setInputValue] = useState(fileURL);
    useEffect(() => setInputValue(fileURL), [fileURL])
    const [isSent, setIsSent] = useState(true)
    // const isSending = isSent === startSend
    const { fromemail, toEmail } = sendForm
    
    const onChangeSendForm = (event) => {
        setSendForm(
            { ...sendForm, [event.target.name]: event.target.value })
    }

    const send = async (event) => {
        try {
            event.preventDefault()
            sendForm.uuid = fileURL.split("/").splice(-1, 1)[0]
            // console.log(sendForm)
            const sendData = await sendMail(sendForm)
            const { success, message } = sendData;
            if (success) {
                setIsSent(true);
                getIsSent(isSent);

                setShowToast({ show: success, type: success ? 'success' : 'danger', message });
                setTimeout(() => {
                    setSendForm({
                        fromEmail: "",
                        toEmail: "",
                    });
                    setShowToast({ show: false, type: null, message: '' });
                }, 5000);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="sharing-container"
                style={{
                    display: (startSend) ? 'block' : 'none'
                }}>
                <p className="expire">Link expires in 24 hrs</p>
                <div className="input-container">
                    <input type="text" id="fileURL" readOnly value={inputValue} name="fileURL"
                        onChange = {e=>setInputValue(e.target.value)}
                    />
                    <img src={copyIcon} id="copyURLBtn" alt="copy to clipboard icon" />
                    <CopyToClipboard text={inputValue}
                        onCopy={() => setCopied(true)}
                        >
                        <img src={copyIcon} id="copyURLBtn" alt="copy to clipboard icon" />
                    </CopyToClipboard>

                </div>

                <p className="email-info">Or Send via Email</p>
                <div className="email-container">
                    <form id="emailForm" onSubmit={send}>
                        <div className="filed">
                            <label htmlFor="fromEmail">Your email</label>
                            <input type="email" autoComplete="email" required name="fromEmail" id="fromEmail"
                                value={fromemail} onChange={onChangeSendForm} />
                        </div>

                        <div className="filed">
                            <label htmlFor="toEmail">Receiver's email</label>
                            <input type="email" required autoComplete='receiver' name="toEmail" id="toEmail"
                                value={toEmail} onChange={onChangeSendForm}
                            />
                        </div>
                        <div className="send-btn-container">
                            <button type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className={`toast ${show ? 'show' : ''}`}>{message}</div> */}
        </>
    )
}

export default SendForm