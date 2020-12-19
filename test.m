E1field = app.campo1DropDown.Value;
E2field = app.campo2DropDown.Value;

a = app.AmplitudEditField_2.Value;
a2 = app.amplitudc2EditField.Value;
freq = app.frecuenciaEditField.Value;
phaseshift = app.phaseEditField.Value;
alpha = app.phaseEditField.Value;

%parametros iniciales de las ondas
newphase = (phaseshift/180)*pi;
t = 0:0.001:1;
w= 2*pi*freq;
angle = w * t;
m = zeros (size(t));

%e equation for 2 unpolarized electric fields

E1 = a*sin(w*t).*exp(-alpha*t);
E2 = a2*sin(w*t + newphase).*exp(-alpha*t);

% se crea las animaciones para las graficas
E1curve = animatedline(app.UIAxes3,'Color',[0.3 0.75 0.93]);
E2curve = animatedline(app.UIAxes3,'Color',[1 0.5 0.6]);
Polcurve = animatedline(app.UIAxes3,'Color', [1 0.69 0.5],'Linewidth',2);
curve = animatedline(app.UIAxes4,'Color', [1 0.69 0.5],'Linewidth',2);

%animation starts
% ********************************************************************************
%wave propagates in x direction

if (strcmp(E1field,'xy')) && (strcmp (E2field,'xz'))
        set(app.UIAxes3,'XLim',[0 1],'YLim',[-a a],'ZLim',[-a2 a2]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(t)');
        ylabel(app.UIAxes3, 'Y(Amplitud)');
        zlabel(app.UIAxes3, 'Z(Amplitud)');
        xlabel(app.UIAxes4,'Y');
        xlabel(app.UIAxes4,'Z');
        set(app.UIAxes4,'XLim',[-a a],'YLim',[-a2 a2]);

for i=1:length(angle)
    addpoints(E1curve,t(i),E1(i),m(i));
    addpoints(E2curve,t(i),m(i),E2(i));
    addpoints(Polcurve,t(i),E1(i)+m(i),E2(i)+m(i));
    addpoints(curve,m(i)+E1(i),m(i)+E2(i));
    waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate;
    pause(0.05);
end
 app.GenerarButton.Value = 0;

% *****************************
elseif (strcmp(E2field,'xy')) && (strcmp(E1field,'xz'))

      set(app.UIAxes3,'XLim',[0 1],'YLim',[-a2 a2],'ZLim',[-a a]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(t)');
        ylabel(app.UIAxes3, 'Y(Amplitud)');
        zlabel(app.UIAxes3, 'Z(Amplitud)');
        xlabel(app.UIAxes4,'Y');
        xlabel(app.UIAxes4,'Z');
        set(app.UIAxes4,'XLim',[-a2 a2],'YLim',[-a a]);

for i=1:length(angle)
    addpoints(E1curve,t(i),E1(i),m(i));
    addpoints(E2curve,t(i),m(i),E2(i));
    addpoints(Polcurve,t(i),E1(i)+m(i),E2(i)+m(i));
    addpoints(curve,m(i)+E1(i),m(i)+E2(i));
    waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate;
     pause(0.05);
end
 app.GenerarButton.Value = 0;

  % *****************************

  elseif (strcmp(E2field,'xy')) && (strcmp(E1field,'xz'))

      set(app.UIAxes3,'XLim',[0 1],'YLim',[-a2 a2],'ZLim',[-a a]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(t)');
        ylabel(app.UIAxes3, 'Y(Amplitud)');
        zlabel(app.UIAxes3, 'Z(Amplitud)');
        xlabel(app.UIAxes4,'Y');
        xlabel(app.UIAxes4,'Z');
        set(app.UIAxes4,'XLim',[-a2 a2],'YLim',[-a a]);

for i=1:length(angle)
    addpoints(E2curve,t(i),E2(i),m(i));
    addpoints(E1curve,t(i),m(i),E1(i));
    addpoints(Polcurve,t(i),E2(i)+m(i),E1(i)+m(i));
    addpoints(curve,m(i)+E2(i),m(i)+E1(i));
    waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate;
    pause(0.05);
end
app.GenerarButton.Value = 0;



%animation starts
% ********************************************************************************
%wave propagates in y direction


elseif (strcmp(E1field,'yx')) && (strcmp(E2field,'yz'))

      set(app.UIAxes3,'XLim',[-a a],'YLim',[0 1],'ZLim',[-a2 a2]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(Amplitude)');
        ylabel(app.UIAxes3, 'Y(t)');
        zlabel(app.UIAxes3, 'Z(Amplitud)');
        xlabel(app.UIAxes4,'X');
        xlabel(app.UIAxes4,'Z');
        set(app.UIAxes4,'XLim',[-a2 a2],'YLim',[-a a]);

for i=1:length(angle)
    addpoints(E1curve,E1(i),t(i),m(i));
    addpoints(E2curve,m(i),t(i),E2(i));
    addpoints(Polcurve,E1(i)+m(1),t(1),E2(i)+m(i));
    addpoints(curve,-(m(i)+E2(i)),m(i)+E1(i));
    waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate;
    pause(0.05);
end
app.GenerarButton.Value = 0;

  % *****************************

  elseif (strcmp(E2field,'yx')) && (strcmp(E1field,'yz'))

      set(app.UIAxes3,'XLim',[-a2 a2],'YLim',[0 1],'ZLim',[-a a]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(Amplitude)');
        ylabel(app.UIAxes3, 'Y(t)');
        zlabel(app.UIAxes3, 'Z(Amplitud)');
        xlabel(app.UIAxes4,'X');
        xlabel(app.UIAxes4,'Z');
        set(app.UIAxes4,'XLim',[-a2 a2],'YLim',[-a a]);

for i=1:length(angle)
    addpoints(E1curve,E1(i),t(i),m(i));
    addpoints(E2curve,m(i),t(i),E2(i));
    addpoints(Polcurve,E1(i)+m(i),t(i),E2(i)+m(i));
    addpoints(curve,-(m(i)+E2(i)),m(i)+E1(i));
    waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate;
    pause(0.05);
end
app.GenerarButton.Value = 0;

% *****************************

  elseif (strcmp(E2field,'yx')) && (strcmp(E1field,'yz'))

      set(app.UIAxes3,'XLim',[-a2 a2],'YLim',[0 1],'ZLim',[-a a]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(Amplitude)');
        ylabel(app.UIAxes3, 'Y(t)');
        zlabel(app.UIAxes3, 'Z(Amplitud)');
        xlabel(app.UIAxes4,'X');
        xlabel(app.UIAxes4,'Z');
        set(app.UIAxes4,'XLim',[-a2 a2],'YLim',[-a a]);

for i=1:length(angle)
    addpoints(E1curve,m(i),t(i),E1(i));
    addpoints(E2curve,E2(i),t(i),m(i));
    addpoints(Polcurve,E2(i)+m(i),t(i),E1(i)+m(i));
    addpoints(curve,-(m(i)+E2(i)),m(i)+E1(i));
    waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate;
    pause(0.05);
end
app.GenerarButton.Value = 0;



%animation starts
% ********************************************************************************
%wave propagates in z direction


elseif (strcmp(E1field,'zx')) && (strcmp(E2field,'zy'))

      set(app.UIAxes3,'XLim',[-a a],'YLim',[-a2 a2],'ZLim',[0 1]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(Amplitude)');
        ylabel(app.UIAxes3, 'Y(Amplitud)');
        zlabel(app.UIAxes3, 'Z(t)');
        xlabel(app.UIAxes4,'X');
        xlabel(app.UIAxes4,'Y');
        set(app.UIAxes4,'XLim',[-a2 a2],'YLim',[-a a]);

for i=1:length(angle)
    addpoints(E1curve,m(i),t(i),E1(i));
    addpoints(E2curve,E2(i),t(i),m(i));
    addpoints(Polcurve,E2(i)+m(i),t(i),E1(i)+m(i));
    addpoints(curve,-(m(i)+E2(i)),m(i)+E1(i));
    waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate;
    pause(0.05);
end
app.GenerarButton.Value = 0;

  % *****************************

  elseif (strcmp(E1field,'zx')) && (strcmp(E2field,'zy'))

      set(app.UIAxes3,'XLim',[-a a],'YLim',[-a2 a2],'ZLim',[0 1]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(Amplitude)');
        ylabel(app.UIAxes3, 'Y(Amplitude)');
        zlabel(app.UIAxes3, 'Z(t)');
        xlabel(app.UIAxes4,'X');
        xlabel(app.UIAxes4,'Y');
        set(app.UIAxes4,'XLim',[-a2 a2],'YLim',[-a a]);

for i=1:length(angle)
    addpoints(E1curve,E(i),m(i),t(i));
    addpoints(E2curve,m(i),E2(i),t1(i));
    addpoints(Polcurve,E(i)+m(i),m(i)+E2(i),t(i));
    addpoints(curve,(m(i)+E2(i)),m(i)+E1(i));
%                 waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate ;
    pause(0.05);
end
%             app.GenerarButton.Value = 0;

% *****************************

  elseif (strcmp(E2field,'zx')) && (strcmp(E1field,'zy'))

      set(app.UIAxes3,'XLim',[-a2 a2],'YLim',[-a a],'ZLim',[0 1]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(Amplitude)');
        ylabel(app.UIAxes3, 'Y(Amplitud)');
        zlabel(app.UIAxes3, 'Z(t)');
        xlabel(app.UIAxes4,'X');
        xlabel(app.UIAxes4,'Y');
        set(app.UIAxes4,'XLim',[-a2 a2],'YLim',[-a a]);

for i=1:length(angle)
    addpoints(E1curve,E1(i),m(i),t(i));
    addpoints(E2curve,m(i),E2(i),t(i));
    addpoints(Polcurve,E1(i)+m(i),m(i)+E2(i),t(i));
    addpoints(curve,m(i)+E2(i),m(i)+E1(i));
    waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate ;
    pause(0.05);
end
app.GenerarButton.Value = 0;



% *****************************

  elseif (strcmp(E2field,'zx')) && (strcmp(E1field,'zy'))

      set(app.UIAxes3,'XLim',[-a2 a2],'YLim',[-a a],'ZLim',[0 1]);
        view(app.UIAxes3,3);
        xlabel(app.UIAxes3,'X(Amplitude)');
        ylabel(app.UIAxes3, 'Y(Amplitud)');
        zlabel(app.UIAxes3, 'Z(t)');
        xlabel(app.UIAxes4,'X');
        xlabel(app.UIAxes4,'Y');
        set(app.UIAxes4,'XLim',[-a2 a2],'YLim',[-a a]);

for i=1:length(angle)
    addpoints(E1curve,m(i),E1(i),t(i));
    addpoints(E2curve,E2(i),m(i),t(i));
    addpoints(Polcurve,E2(i)+m(i),m(i)+E1(i),t(i));
    addpoints(curve,m(i)+E2(i),m(i)+E1(i));
    waitfor(app.GenerarButton,'Value',1);
    drawnow limitrate;
    pause(0.05);
end
app.GenerarButton.Value = 0;
end
