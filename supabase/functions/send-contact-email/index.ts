import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

console.log("RESEND_API_KEY configured:", !!Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Edge function invoked, method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing contact form request...");
    
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY not found in environment variables");
      throw new Error("Email service not configured");
    }
    
    const formData: ContactFormData = await req.json();
    const { firstName, lastName, email, phone, subject, message } = formData;

    console.log("Received contact form submission:", { firstName, lastName, email, subject });

    // Send email to the site owner
    const emailResponse = await resend.emails.send({
      from: "Duggarswad Contact <onboarding@resend.dev>",
      to: ["work60929@gmail.com"],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 14px;">
            <p>This message was sent through the Duggarswad website contact form.</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Duggarswad <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Duggarswad!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #e74c3c; text-align: center;">Thank You for Reaching Out!</h2>
          
          <p>Dear ${firstName},</p>
          
          <p>Thank you for contacting Duggarswad! We have received your message about "${subject}" and will get back to you as soon as possible.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What happens next?</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Our team will review your message within 24 hours</li>
              <li>We'll respond to your inquiry via email</li>
              <li>For urgent matters, you can also call us at +91 98765 43210</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to explore our collection of traditional recipes and cooking tips on our website.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://duggarswad.lovable.app" style="background: #e74c3c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Visit Our Website
            </a>
          </div>
          
          <p>Best regards,<br>
          <strong>The Duggarswad Team</strong></p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 14px;">
            <p>Preserving the culinary heritage of Jammu & Kashmir</p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Your message has been sent successfully! We'll get back to you soon." 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to send message. Please try again later." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);