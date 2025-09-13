import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, MapPin, CreditCard, Phone, Calendar, DollarSign } from "lucide-react";

interface Member {
  memberNo: string;
  memberName: string;
  memberType: string;
  siteNo: string;
  contactDetails: string;
  memberClass?: string;
  admissionDate?: string;
  address?: string;
  shareNo?: string;
  noOfShare?: string;
  shareCapitalAmount?: string;
  gender?: string;
  caste?: string;
  aadhaar?: string;
  familyCard?: string;
  voterID?: string;
  pan?: string;
  admissionFeePaid?: string;
  nomineeName?: string;
  relationship?: string;
  totalAmount?: string;
  paidAmount?: string;
  remainingAmount?: string;
  modeOfPayment?: string;
}

interface MemberDetailsProps {
  member: Member;
  userRole: string;
  onBack: () => void;
}

const MemberDetails = ({ member, userRole, onBack }: MemberDetailsProps) => {
  const personalInfo = [
    { label: "Member No", value: member.memberNo, icon: <User className="w-4 h-4" /> },
    { label: "Member Name", value: member.memberName, icon: <User className="w-4 h-4" /> },
    { label: "Member Class", value: member.memberClass, icon: <Badge className="w-4 h-4" /> },
    { label: "Member Type", value: member.memberType, icon: <Badge className="w-4 h-4" /> },
    { label: "Gender", value: member.gender, icon: <User className="w-4 h-4" /> },
    { label: "Caste", value: member.caste, icon: <User className="w-4 h-4" /> },
  ];

  const contactInfo = [
    { label: "Contact Details", value: member.contactDetails, icon: <Phone className="w-4 h-4" /> },
    { label: "Address", value: member.address, icon: <MapPin className="w-4 h-4" /> },
    { label: "Site No", value: member.siteNo, icon: <MapPin className="w-4 h-4" /> },
  ];

  const documentInfo = [
    { label: "Aadhaar", value: member.aadhaar, icon: <CreditCard className="w-4 h-4" /> },
    { label: "Family Card", value: member.familyCard, icon: <CreditCard className="w-4 h-4" /> },
    { label: "Voter ID", value: member.voterID, icon: <CreditCard className="w-4 h-4" /> },
    { label: "PAN", value: member.pan, icon: <CreditCard className="w-4 h-4" /> },
  ];

  const financialInfo = [
    { label: "Share No", value: member.shareNo, icon: <CreditCard className="w-4 h-4" /> },
    { label: "No Of Share", value: member.noOfShare, icon: <CreditCard className="w-4 h-4" /> },
    { label: "Share Capital Amount", value: member.shareCapitalAmount ? `₹${parseFloat(member.shareCapitalAmount).toLocaleString()}` : undefined, icon: <CreditCard className="w-4 h-4" /> },
    { label: "Admission Fee Paid", value: member.admissionFeePaid ? `₹${parseFloat(member.admissionFeePaid).toLocaleString()}` : undefined, icon: <CreditCard className="w-4 h-4" /> },
    { label: "Total Amount", value: member.totalAmount ? `₹${parseFloat(member.totalAmount).toLocaleString()}` : undefined, icon: <DollarSign className="w-4 h-4" /> },
    { label: "Paid Amount", value: member.paidAmount ? `₹${parseFloat(member.paidAmount).toLocaleString()}` : undefined, icon: <DollarSign className="w-4 h-4" /> },
    { label: "Remaining Amount", value: member.remainingAmount ? `₹${parseFloat(member.remainingAmount).toLocaleString()}` : undefined, icon: <DollarSign className="w-4 h-4" /> },
    { label: "Mode of Payment", value: member.modeOfPayment, icon: <CreditCard className="w-4 h-4" /> },
  ];

  const nomineeInfo = [
    { label: "Nominee Name", value: member.nomineeName, icon: <User className="w-4 h-4" /> },
    { label: "Relationship", value: member.relationship, icon: <User className="w-4 h-4" /> },
    { label: "Admission Date", value: member.admissionDate, icon: <Calendar className="w-4 h-4" /> },
  ];

  const InfoCard = ({ title, data }: { title: string; data: Array<{label: string; value?: string; icon: React.ReactNode}> }) => (
    <Card className="border-gov-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gov-header">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gov-border/50 last:border-0">
              <div className="flex items-center gap-2 text-gov-text font-medium">
                {item.icon}
                {item.label}:
              </div>
              <div className="text-gov-header font-semibold">
                {item.value || "Not provided"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gov-bg-light">
      {/* Header */}
      <header className="bg-gov-header text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-gov-header"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to List
              </Button>
              <div>
                <h1 className="text-xl font-bold">Member Details - {member.memberName}</h1>
                <p className="text-blue-200 text-sm">Member No: {member.memberNo}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Member Summary */}
        <Card className="mb-8 border-gov-border bg-gradient-to-r from-gov-bg-light to-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gov-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                {member.memberName.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gov-header">{member.memberName}</h2>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-gov-primary text-white">
                    {member.memberType}
                  </Badge>
                  <Badge variant="outline" className="border-gov-border">
                    Site {member.siteNo}
                  </Badge>
                  <Badge variant="outline" className="border-gov-border">
                    Class {member.memberClass}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InfoCard title="Personal Information" data={personalInfo} />
          <InfoCard title="Contact Information" data={contactInfo} />
          <InfoCard title="Document Information" data={documentInfo} />
          <InfoCard title="Financial Information" data={financialInfo} />
          <div className="lg:col-span-2">
            <InfoCard title="Nominee & Additional Information" data={nomineeInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;