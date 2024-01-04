import React, { useState } from 'react';
import './addmission.css'
import Back from '../common/back/Back';
import { BaseUrl } from '../../config';
import { toast } from 'react-hot-toast';
import Header from '../common/heading/Header';
import Footer from '../common/footer/Footer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';


function Addmission() {


  const history = useHistory()

  const userDetails = localStorage.getItem("userDetails")
  const unparsed = JSON.parse(userDetails)
  const [error, setError] = useState(null);


  // console.log(JSON.parse(userDetails)._id)
  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return;
    }
    return age;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    fatherName: Yup.string().required("Father's Name is required"),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    cnic: Yup.string().required('CNIC is required'),
    gender: Yup.string().required('Gender is required'),
    religion: Yup.string().required('Religion is required'),
    matricResult: Yup.mixed().required('Matric Result is required'),
    fatherIdCard: Yup.mixed().required("Father's ID Card is required"),
    certificate: Yup.mixed().required('Certificate is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    idCardPic: Yup.mixed().required('Personal ID Card is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    otherMobileNumber: Yup.string().required('Other Mobile Number is required'),
    department: Yup.string().required('Department is required'),
    intermediateResult: Yup.mixed().required('Intermediate Result is required'),
    picturePassport: Yup.mixed().required('Picture is required'),
    interMarks: Yup.number().required('Inter Marks is required'),
    matricMarks: Yup.number().required('Matric marks is required'),
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      fatherName: '',
      dateOfBirth: '',
      cnic: '',
      gender: '',
      religion: '',
      matricResult: '',
      fatherIdCard: '',
      certificate: '',
      email: '',
      idCardPic: null,
      phoneNumber: '',
      otherMobileNumber: '',
      department: '',
      intermediateResult: '',
      picturePassport: null,
      interMarks: 0,
      matricMarks: 0
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (calculateAge(values.dateOfBirth) >= 18) {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('user_id', unparsed._id);
        formData.append('father_name', values.fatherName);
        formData.append('dateofbirth', values.dateOfBirth);
        formData.append('cnic', values.cnic);
        formData.append('gender', values.gender);
        formData.append('religion', values.religion);
        formData.append('matric_result', values.matricResult);
        formData.append('father_id_card', values.fatherIdCard);
        formData.append('certificate', values.certificate);
        formData.append('email', values.email);
        formData.append('id_card_pic', values.idCardPic);
        formData.append('phone_number', values.phoneNumber);
        formData.append('other_mobile_number', values.otherMobileNumber);
        formData.append('department', values.department);
        formData.append('intermediate_result', values.intermediateResult);
        formData.append('picture_passport', values.picturePassport);
        formData.append('interMarks', values.interMarks);
        formData.append('matricMarks', values.matricMarks);

        fetch(`${BaseUrl}/admission`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              localStorage.setItem('userDetails', JSON.stringify(data.user))
              toast.success(`Your data has been successfully sent to the administration. Once the admin has reviewed your application, you will receive an email notifying you of the approval or rejection of your admission`);
              history.push('/courses')
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setError('Your must be 18 in order to submit admission form')
        // window.scrollTo({
        //   behavior: 'smooth',
        //   top: 0
        // })

        let dd = document.getElementById('mydiv')
        dd.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
        // dd.scrollTo({
        //   behavior:'smooth'
        // })
      }
    }

  });

  // const [name, setName] = useState('');
  // const [fatherName, setFatherName] = useState('');
  // const [dateOfBirth, setDateOfBirth] = useState('');
  // const [cnic, setCnic] = useState('');
  // const [gender, setGender] = useState('');
  // const [religion, setReligion] = useState('');
  // const [matricResult, setMatricResult] = useState('');
  // const [fatherIdCard, setFatherIdCard] = useState('');
  // const [certificate, setCertificate] = useState('');
  // const [email, setEmail] = useState('');
  // const [idCardPic, setIdCardPic] = useState(null);
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [otherMobileNumber, setOtherMobileNumber] = useState('');
  // const [department, setDepartment] = useState('');
  // const [intermediateResult, setIntermediateResult] = useState('');
  // const [picturePassport, setPicturePassport] = useState(null);

  // const handleSubmit = (event) => {
  //   event.preventDefault();


  //   const formData = new FormData();
  //   formData.append('name', name);
  //   formData.append('father_name', fatherName);
  //   formData.append('dateofbirth', dateOfBirth);
  //   formData.append('cnic', cnic);
  //   formData.append('gender', gender);
  //   formData.append('religion', religion);
  //   formData.append('matric_result', matricResult);
  //   formData.append('father_id_card', fatherIdCard);
  //   formData.append('certificate', certificate);
  //   formData.append('email', email);
  //   formData.append('id_card_pic', idCardPic);
  //   formData.append('phone_number', phoneNumber);
  //   formData.append('other_mobile_number', otherMobileNumber);
  //   formData.append('department', department);
  //   formData.append('intermediate_result', intermediateResult);
  //   formData.append('picture_passport', picturePassport);

  //   fetch(`${BaseUrl}/admission`, {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle the response from the server
  //       if(data.success){
  //         toast.success(`Your
  //         data has been successfully sent to the administration. Once the admin
  //         has reviewed your application, you will receive an email notifying you
  //         of the approval or rejection of your admission`)
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.error(error);
  //     })


  // };


  // const handleIdCardPicChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setIdCardPic(selectedFile);
  // };

  // const handlePicturePassportChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setPicturePassport(selectedFile);
  // };

  const { handleSubmit, getFieldProps, touched, errors, setValues } = formik;




  const handleIdCardPicChange = (event) => {
    const selectedFile = event.target.files[0];
    formik.setFieldValue('idCardPic', selectedFile);
  };

  const handlePicturePassportChange = (event) => {
    const selectedFile = event.target.files[0];
    formik.setFieldValue('picturePassport', selectedFile);
  };

  // code jo beja h m ny usy notepad m pasete krain


  return (
    <>
      <Header />
      <Back title="Addmission" />
      {/* <form className="admission-form mb-3 container" onSubmit={handleSubmit}>
        <h2 className='text-center'>Admission Form</h2>
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />
        <label for="fname" class="form-label">Father Name</label>
       <input
          type="text"
          className="form-control"
          value={fatherName}
          onChange={(event) => setFatherName(event.target.value)}
          placeholder="Father's Name"
        />
        <label for="dob" class="form-label">Date of Birth</label>
        <input
          type="date"
          className="form-control"
          value={dateOfBirth}
          onChange={(event) => setDateOfBirth(event.target.value)}
          placeholder="Date of Birth"
        />
        <label for="cnic" class="form-label">CNIC</label>
        <input
          type="text"
          className="form-control"
          value={cnic}
          onChange={(event) => setCnic(event.target.value)}
          placeholder="CNIC"
        />
        <label for="gender" class="form-label">Gender</label>
        <input
          type="text"
          className="form-control"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          placeholder="Gender"
        />
        <label for="religion" class="form-label">Religion</label>
        <input
          type="text"
          className="form-control"
          value={religion}
          onChange={(event) => setReligion(event.target.value)}
          placeholder="Religion"
        />
        <label for="email" class="form-label">email</label>
        <input
          type="email"
          className='form-control'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <label for="phone" class="form-label">phone</label>
         <input
          type="text"
          className='form-control'
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          placeholder="Phone Number"
        />
        <label for="otherphone" class="form-label">Other Mobile Number</label>
        <input
          type="text"
          className='form-control'
          value={otherMobileNumber}
          onChange={(event) => setOtherMobileNumber(event.target.value)}
          placeholder="Other Mobile Number"
        />
        <label for="department" class="form-label">Department</label>
        <input
          type="text"
          className='form-control'
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          placeholder="Department"
        />
        <label for="Mresult" class="form-label">Matric Result</label>
        <input
          type="file"
          className="form-control m-2"
          // value={matricResult}
          onChange={(event) => setMatricResult(event.target.files[0])}
          placeholder="Matric Result"
        />
        <label for="fidcarrd" class="form-label">Father Id Card</label>
        <input
          type="file"
          // value={fatherIdCard}
          className='m-2 form-control'
          onChange={(event) => setFatherIdCard(event.target.files[0])}
          placeholder="Father's ID Card"
        />
        <label for="certificate" class="form-label">Certificate</label>
        <input
          type="file"
          // value={certificate}
          className='m-2 form-control'

          onChange={(event) => setCertificate(event.target.files[0])}
          placeholder="Certificate"
        />
        <label for="yidcard" class="form-label">Personal Id Card</label>
        <input
          type="file"
          className='m-2 form-control'

          onChange={handleIdCardPicChange}
        />
        <label for="interresult" class="form-label">Inter Result</label>
        <input
          type="file"
          className='form-control'
          // value={intermediateResult}
          onChange={(event) => setIntermediateResult(event.target.files[0])}
          placeholder="Intermediate Result"
        />
        <label for="passportpic" class="form-label">Picture</label>
        <input
          type="file"
          className='form-control'
          onChange={handlePicturePassportChange}
        />
       <div className="row m-auto">
        <div className="col-12">
        <button type="submit" className='btn btn-primary my-3'>Submit</button>
        </div>
       </div>
      </form> */}


      {/* formik form start from here  */}
      <form className="admission-form mb-3 container" onSubmit={handleSubmit}>
      {error && <div className='text-center alert alert-danger' id="mydiv" style={{ color: "red" }}>{error}</div>}
        <h2 className='text-center'>Admission Form</h2>
        <div className='fmname'>
          <div className='fmnametwo'>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
              {...getFieldProps('name')}
              placeholder="Name"
            />
            {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className='fmnamethree'>
            <label htmlFor="fname" className="form-label">
              Father Name
            </label>
            <input
              type="text"
              id="fname"
              className={`form-control ${touched.fatherName && errors.fatherName ? 'is-invalid' : ''}`}
              {...getFieldProps('fatherName')}
              placeholder="Father's Name"
            />
            {touched.fatherName && errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
          </div>
        </div>
        <div className='dcinput'>
          <div className='dcinputtwo'>
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className={`form-control ${touched.dateOfBirth && errors.dateOfBirth ? 'is-invalid' : ''}`}
              {...getFieldProps('dateOfBirth')}
              placeholder="Date of Birth"
            />
            {touched.dateOfBirth && errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
          </div>
          <div className='dcinputthree'>
            <label htmlFor="cnic" className="form-label">
              CNIC
            </label>
            <input
              type="text"
              id="cnic"
              className={`form-control ${touched.cnic && errors.cnic ? 'is-invalid' : ''}`}
              {...getFieldProps('cnic')}
              placeholder="CNIC"
            />
            {touched.cnic && errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
          </div>
        </div>
        <div className='grinput'>
          <div className='grinputtwo'>
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className={`form-control ${touched.gender && errors.gender ? 'is-invalid' : ''}`}
              id='gender'
              name='gender'
              {...getFieldProps('gender')}

            >
              <option value="">Select</option>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
            </select>
            {/* <input
        type="text"
        id="gender"
        className={`form-control ${touched.gender && errors.gender ? 'is-invalid' : ''}`}
        {...getFieldProps('gender')}
        placeholder="Gender"
      /> */}
            {touched.gender && errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>
          <div className='grinputthree'>
            <label htmlFor="religion" className="form-label">
              Religion
            </label>
            <input
              type="text"
              id="religion"
              className={`form-control ${touched.religion && errors.religion ? 'is-invalid' : ''}`}
              {...getFieldProps('religion')}
              placeholder="Religion"
            />
            {touched.religion && errors.religion && <div className="invalid-feedback">{errors.religion}</div>}
          </div>
        </div>
        <div className='epinput'>
          <div className='epinputtwo'>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
              {...getFieldProps('email')}
              placeholder="Email"
            />
            {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className='epinputthree'>
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
              {...getFieldProps('phoneNumber')}
              placeholder="Phone Number"
            />
            {touched.phoneNumber && errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>
        </div>
        <div className='odinput'>
          <div className='odinputtwo'>
            <label htmlFor="otherphone" className="form-label">
              Other Mobile Number
            </label>
            <input
              type="text"
              id="otherphone"
              className={`form-control ${touched.otherMobileNumber && errors.otherMobileNumber ? 'is-invalid' : ''}`}
              {...getFieldProps('otherMobileNumber')}
              placeholder="Other Mobile Number"
            />
            {touched.otherMobileNumber && errors.otherMobileNumber && <div className="invalid-feedback">{errors.otherMobileNumber}</div>}
          </div>
          <div className='odinputthree'>
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <input
              type="text"
              id="department"
              className={`form-control ${touched.department && errors.department ? 'is-invalid' : ''}`}
              {...getFieldProps('department')}
              placeholder="Department"
            />
            {touched.department && errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>
        </div>
        <div className='mminput'>
          <div className='mminputtwo'>
            <label htmlFor="Mresult" className="form-label">
              Matric Result
            </label>
            <input
              type="file"
              id="Mresult"
              className={`form-control m-2 ${touched.matricResult && errors.matricResult ? 'is-invalid' : ''}`}
              onChange={(event) => formik.setFieldValue('matricResult', event.target.files[0])}
              placeholder="Matric Result"
            />
            {touched.matricResult && errors.matricResult && <div className="invalid-feedback">{errors.matricResult}</div>}
          </div>
          <div className='mminputthree'>
            <label htmlFor="Mresult" className="form-label">
              Matric Marks
            </label>
            <input
              type="text"
              id="matricMarks"
              className={`form-control m-2 ${touched.matricMarks && errors.matricMarks ? 'is-invalid' : ''}`}
              onChange={(event) => formik.setFieldValue('matricMarks', event.target.value)}
              placeholder="Matric Marks"
            />
            {touched.matricMarks && errors.matricMarks && <div className="invalid-feedback">{errors.matricMarks}</div>}
          </div>
        </div>
        <div className='fcinput'>
          <div className='fcinputtwo'>
            <label htmlFor="fidcarrd" className="form-label">
              Father ID Card
            </label>
            <input
              type="file"
              id="fidcarrd"
              className={`form-control m-2 ${touched.fatherIdCard && errors.fatherIdCard ? 'is-invalid' : ''}`}
              onChange={(event) => formik.setFieldValue('fatherIdCard', event.target.files[0])}
              placeholder="Father's ID Card"
            />
            {touched.fatherIdCard && errors.fatherIdCard && <div className="invalid-feedback">{errors.fatherIdCard}</div>}
          </div>
          <div className='fcinputthree'>
            <label htmlFor="certificate" className="form-label">
              Certificate
            </label>
            <input
              type="file"
              id="certificate"
              className={`form-control m-2 ${touched.certificate && errors.certificate ? 'is-invalid' : ''}`}
              onChange={(event) => formik.setFieldValue('certificate', event.target.files[0])}
              placeholder="Certificate"
            />
            {touched.certificate && errors.certificate && <div className="invalid-feedback">{errors.certificate}</div>}
          </div>
        </div>
        <div className='piinput'>
          <div className='piinputtwo'>
            <label htmlFor="yidcard" className="form-label">
              Personal ID Card
            </label>
            <input
              type="file"
              id="yidcard"
              className={`form-control m-2 ${touched.idCardPic && errors.idCardPic ? 'is-invalid' : ''}`}
              onChange={handleIdCardPicChange}
            />
            {touched.idCardPic && errors.idCardPic && <div className="invalid-feedback">{errors.idCardPic}</div>}
          </div>
          <div className='piinputthree'>
            <label htmlFor="interresult" className="form-label">
              Inter Result
            </label>
            <input
              type="file"
              style={{ margin: '8px' }}
              id="interresult"
              className={`form-control ${touched.intermediateResult && errors.intermediateResult ? 'is-invalid' : ''}`}
              onChange={(event) => formik.setFieldValue('intermediateResult', event.target.files[0])}
              placeholder="Intermediate Result"
            />
            {touched.intermediateResult && errors.intermediateResult && <div className="invalid-feedback">{errors.intermediateResult}</div>}
          </div>
        </div>
        <div className='ipinput'>
          <div className='ipinputtwo'>
            <label htmlFor="interresult" className="form-label">
              Inter Marks
            </label>
            <input
              type="text"
              id="interMarks"
              className={`form-control ${touched.interMarks && errors.interMarks ? 'is-invalid' : ''}`}
              onChange={(event) => formik.setFieldValue('interMarks', event.target.value)}
              placeholder="Intermediate Marks"
            />
            {touched.interMarks && errors.interMarks && <div className="invalid-feedback">{errors.interMarks}</div>}
          </div>
          <div className='ipinputthree'>
            <label htmlFor="passportpic" className="form-label">
              Picture
            </label>
            <input
              type="file"
              id="passportpic"
              className={`form-control ${touched.picturePassport && errors.picturePassport ? 'is-invalid' : ''}`}
              onChange={handlePicturePassportChange}
            />
            {touched.picturePassport && errors.picturePassport && <div className="invalid-feedback">{errors.picturePassport}</div>}
          </div>
        </div>
        <div className="row m-auto">
          <div className="col-12">
            <button type="submit" className="btn btn-primary my-3">
              Submit
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </>
  );
}

export default Addmission