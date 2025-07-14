import { useState, useContext, useEffect } from 'react';
import copyIcon from '../assets/copy-icon.svg';
import axios from "axios";
import { FileContext } from '../contexts/FileContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { apiUrl } from '../contexts/constants';

// function SendForm({
//     startSend,
//     fileURL,
//     getIsSent,
// }) {
//     const { sendMail, setShowToast } = useContext(FileContext);

//     const [sendForm, setSendForm] = useState({
//         fromEmail: "",
//         toEmail: ""
//     });

//     const [copied, setCopied] = useState(false);
//     const [inputValue, setInputValue] = useState(fileURL);
//     const [slug, setSlug] = useState("");
//     const [shortLink, setShortLink] = useState("");

//     useEffect(() => setInputValue(fileURL), [fileURL]);

//     const [isSent, setIsSent] = useState(true);
//     const { fromemail, toEmail } = sendForm;

//     const onChangeSendForm = (event) => {
//         setSendForm({
//             ...sendForm,
//             [event.target.name]: event.target.value
//         });
//     };

//     const createShortLink = async (fileURL, slug) => {
//         if (!slug) {
//             setShowToast({ show: true, type: 'danger', message: 'Please enter a slug!' });
//             return;
//         }
//         try {
//             const res = await axios.post(`${apiUrl}/api/url`, { url: fileURL, slug });
//             if (res.data.success) {
//                 const shortURL = `${window.location.origin}/${slug}`;
//                 setShortLink(shortURL);
//                 setShowToast({ show: true, type: 'success', message: 'Short link created!' });
//                 setTimeout(() => {
//                     setSendForm({
//                         fromEmail: "",
//                         toEmail: "",
//                     });
//                     setShowToast({ show: false, type: null, message: '' });
//                 }, 2000);
//             } else {
//                 setShowToast({ show: true, type: 'danger', message: res.data.message });
//             }
//         } catch (err) {
//             console.error(err);
//             setShowToast({ show: true, type: 'danger', message: 'Failed to create short link.' });
//         }
//     };

//     const send = async (event) => {
//         try {
//             event.preventDefault();
//             sendForm.uuid = fileURL.split("/").splice(-1, 1)[0];
//             const sendData = await sendMail(sendForm);
//             const { success, message } = sendData;
//             if (success) {
//                 setIsSent(true);
//                 getIsSent(isSent);

//                 setShowToast({
//                     show: success,
//                     type: success ? 'success' : 'danger',
//                     message
//                 });

//                 setTimeout(() => {
//                     setSendForm({
//                         fromEmail: "",
//                         toEmail: "",
//                     });
//                     setShowToast({ show: false, type: null, message: '' });
//                 }, 5000);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (copied) {
//             setShowToast({ show: true, type: 'success', message: 'Link copied!' });
//             setTimeout(() => {
//                 setShowToast({ show: false, type: null, message: '' });
//             }, 3000);
//             setCopied(false);
//         }
//     }, [copied, setShowToast]);

//     return (
//         <>
//             <div
//                 className="sharing-container"
//                 style={{
//                     display: startSend ? 'block' : 'none'
//                 }}
//             >
//                 <p className="expire">Link expires in 24 hrs</p>

//                 {/* Luôn hiển thị link gốc */}
//                 <div className="input-container">
//                     <input
//                         type="text"
//                         id="fileURL"
//                         readOnly
//                         value={inputValue}
//                         name="fileURL"
//                         onChange={e => setInputValue(e.target.value)}
//                     />
//                     <CopyToClipboard text={inputValue} onCopy={() => setCopied(true)}>
//                         <img src={copyIcon} id="copyURLBtn" alt="copy to clipboard icon" />
//                     </CopyToClipboard>
//                 </div>

//                 {/* Chỉ render khi có shortLink */}
//                 {shortLink && (
//                     <div className="input-container" style={{ marginTop: '1rem' }}>
//                         <input type="text" readOnly value={shortLink} />
//                         <CopyToClipboard text={shortLink} onCopy={() => setCopied(true)}>
//                             <img src={copyIcon} id="copyShortLinkBtn" alt="copy short link icon" />
//                         </CopyToClipboard>
//                     </div>
//                 )}

//                 <div className="shorten-container" style={{ marginTop: '1rem' }}>
//                     <input
//                         type="text"
//                         placeholder="Enter custom slug (e.g. my-link)"
//                         value={slug}
//                         onChange={e => setSlug(e.target.value)}
//                     />
//                     <button type="button" onClick={() => createShortLink(inputValue, slug)}>
//                         Shorten
//                     </button>
//                 </div>

//                 <p className="email-info">Or Send via Email</p>

//                 <div className="email-container">
//                     <form id="emailForm" onSubmit={send}>
//                         <div className="filed">
//                             <label htmlFor="fromEmail">Your email</label>
//                             <input
//                                 type="email"
//                                 autoComplete="email"
//                                 required
//                                 name="fromEmail"
//                                 id="fromEmail"
//                                 value={fromemail}
//                                 onChange={onChangeSendForm}
//                             />
//                         </div>

//                         <div className="filed">
//                             <label htmlFor="toEmail">Receiver's email</label>
//                             <input
//                                 type="email"
//                                 required
//                                 autoComplete="receiver"
//                                 name="toEmail"
//                                 id="toEmail"
//                                 value={toEmail}
//                                 onChange={onChangeSendForm}
//                             />
//                         </div>

//                         <div className="send-btn-container">
//                             <button type="submit">Send</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }

function SendForm({
    startSend,
    fileURL,
    getIsSent,
}) {
    const { sendMail, setShowToast } = useContext(FileContext);

    const [sendForm, setSendForm] = useState({
        fromEmail: "",
        toEmail: ""
    });

    const [copied, setCopied] = useState(false);
    const [inputValue, setInputValue] = useState(fileURL);
    const [slug, setSlug] = useState("");
    const [shortLink, setShortLink] = useState("");

    useEffect(() => setInputValue(fileURL), [fileURL]);

    const [isSent, setIsSent] = useState(true);
    const { fromEmail, toEmail } = sendForm;

    const showToast = (type, message, duration = 3000) => {
        setShowToast({ show: true, type, message });
        setTimeout(() => {
            setShowToast({ show: false, type: null, message: '' });
        }, duration);
    };

    const onChangeSendForm = (event) => {
        setSendForm({
            ...sendForm,
            [event.target.name]: event.target.value
        });
    };

    const createShortLink = async (fileURL, slug) => {
        if (!slug) {
            showToast('danger', 'Please enter a slug!');
            return;
        }
        try {
            const res = await axios.post(`${apiUrl}/api/url`, { url: fileURL, slug });
            if (res.data.success) {
                const shortURL = `${window.location.origin}/${slug}`;
                setShortLink(shortURL);
                showToast('success', 'Short link created!', 2000);
                setSendForm({ fromEmail: "", toEmail: "" });
            } else {
                showToast('danger', res.data.message);
            }
        } catch (err) {
            console.error(err);
            showToast('danger', 'Failed to create short link.');
        }
    };

    const send = async (event) => {
        try {
            event.preventDefault();
            sendForm.uuid = fileURL.split("/").splice(-1, 1)[0];
            const sendData = await sendMail(sendForm);
            const { success, message } = sendData;
            if (success) {
                setIsSent(true);
                getIsSent(isSent);

                showToast('success', message, 5000);
                setSendForm({ fromEmail: "", toEmail: "" });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (copied) {
            showToast('success', 'Link copied!');
            setCopied(false);
        }
    }, [copied]);

    return (
        <>
            <div
                className="sharing-container"
                style={{
                    display: startSend ? 'block' : 'none'
                }}
            >
                <p className="expire">Link expires in 24 hrs</p>

                <div className="input-container">
                    <input
                        type="text"
                        id="fileURL"
                        readOnly
                        value={inputValue}
                        name="fileURL"
                    />
                    <CopyToClipboard text={inputValue} onCopy={() => setCopied(true)}>
                        <img src={copyIcon} id="copyURLBtn" alt="copy to clipboard icon" />
                    </CopyToClipboard>
                </div>

                {shortLink && (
                    <div className="input-container" style={{ marginTop: '1rem' }}>
                        <input type="text" readOnly value={shortLink} />
                        <CopyToClipboard text={shortLink} onCopy={() => setCopied(true)}>
                            <img src={copyIcon} id="copyShortLinkBtn" alt="copy short link icon" />
                        </CopyToClipboard>
                    </div>
                )}

                <div className="shorten-container" style={{ marginTop: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Enter custom slug (e.g. my-link)"
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                    />
                    <button type="button" onClick={() => createShortLink(inputValue, slug)}>
                        Shorten
                    </button>
                </div>

                <p className="email-info">Or Send via Email</p>

                <div className="email-container">
                    <form id="emailForm" onSubmit={send}>
                        <div className="filed">
                            <label htmlFor="fromEmail">Your email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                name="fromEmail"
                                id="fromEmail"
                                value={fromEmail}
                                onChange={onChangeSendForm}
                            />
                        </div>

                        <div className="filed">
                            <label htmlFor="toEmail">Receiver's email</label>
                            <input
                                type="email"
                                required
                                autoComplete="receiver"
                                name="toEmail"
                                id="toEmail"
                                value={toEmail}
                                onChange={onChangeSendForm}
                            />
                        </div>

                        <div className="send-btn-container">
                            <button type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SendForm;
